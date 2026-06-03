using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Serilog;
using Serilog.Exceptions;
using Serilog.Exceptions.Core;
using Serilog.Exceptions.EntityFrameworkCore.Destructurers;
using backend.Enrichers;
using Serilog.Events;
using Destructurama;
using Microsoft.AspNetCore.Identity;
using backend.Viewmodels;
using backend.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

string environment = builder.Environment.EnvironmentName;

builder.Services.AddHealthChecks();

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft.AspNetCore.Hosting", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Mvc", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Routing", LogEventLevel.Warning)
    .Destructure.UsingAttributes()
    .Enrich.WithProperty("Name", "Nordar")
    .Enrich.WithProperty("Version", "v0.1.0")
    .Enrich.WithProperty("Environment", environment)
    .Enrich.WithExceptionDetails(new DestructuringOptionsBuilder().WithDefaultDestructurers().WithDestructurers(new[] { new DbUpdateExceptionDestructurer() }))
    .Enrich.With<RequestEnricher>()

    .WriteTo.Console(outputTemplate: "{Name} {Version} [{Environment} {Timestamp:HH:mm:ss} {Level:u3}] {RequestData} {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

builder.Services.AddHttpContextAccessor();

builder.Services.AddSerilog();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(builder.Configuration["Origins:Frontend"])
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// builder.Services.AddRouting(options =>
// {
//     options.LowercaseUrls = true;
// });

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    }
);

builder.Services.AddProblemDetails();

builder.Services.AddAuthentication().AddCookie("Identity.Application");
builder.Services.AddAuthorization();
builder.Services.AddIdentityCore<User>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 16;
    options.Password.RequiredUniqueChars = 0;

    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    options.User.RequireUniqueEmail = true;

    options.Lockout.MaxFailedAccessAttempts = 3;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromHours(1);

})
.AddSignInManager<SignInManager<User>>()
.AddEntityFrameworkStores<AppDbContext>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "__Host-AuthToken";
    options.Cookie.HttpOnly = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.SameSite = SameSiteMode.Strict;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(120);
    options.SlidingExpiration = false;

    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
});

builder.Services.AddRateLimiter(options =>
{
    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        await context.HttpContext.Response.WriteAsync("Too many requests. Please try again later.");

        Log.Warning("Ratelimit: {username}", context.HttpContext.User.Identity?.Name ?? "anonymous");
    };

    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? "anonymous",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 30,
                Window = TimeSpan.FromMinutes(1)
            }));
});

builder.Services.AddOpenApi();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddAutoMapper(cfg =>
{
    cfg.CreateMap<NorthStarCreate, NorthStar>();
    cfg.CreateMap<BearingCreate, Bearing>();
    cfg.CreateMap<MovementCreate, Movement>();
    cfg.CreateMap<NorthStar, NorthStarGet>();
    cfg.CreateMap<Bearing, BearingGet>();
    cfg.CreateMap<Movement, MovementGet>();

    cfg.CreateMap<OnetimeEventCreate, OnetimeEvent>();
    cfg.CreateMap<RecurringEventCreate, RecurringEvent>();
    cfg.CreateMap<Event, EventGet>()
        .ForMember(destination => destination.Title, options => options.MapFrom(source => source.Name))
        .Include<OnetimeEvent, OnetimeEventGet>()
        .Include<RecurringEvent, RecurringEventGet>();
    cfg.CreateMap<OnetimeEvent, OnetimeEventGet>()
        .ForMember(destination => destination.Title, options => options.MapFrom(source => source.Name))
        .IncludeBase<Event, EventGet>();
    cfg.CreateMap<RecurringEvent, RecurringEventGet>()
        .ForMember(destination => destination.Title, options => options.MapFrom(source => source.Name))
        .ForMember(destination => destination.Recurrence, options =>
        {
            options.MapFrom(source => new RecurrenceGet
            {
                RRULE = source.RRULE,
                ExDate = new List<string>()
            });
        })
        .IncludeBase<Event, EventGet>();
    cfg.CreateMap<EventInstanceStateSet, EventInstanceState>();
    cfg.CreateMap<EventInstanceState, EventInstanceStateGet>();

    cfg.CreateMap<ReflectionCreate, Reflection>();
    cfg.CreateMap<Reflection, ReflectionGet>();
});

builder.Services.AddScoped<GoalService>();
builder.Services.AddScoped<EventService>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"))
    .UseSeeding((context, _) =>
    {
        AppDbContext appDbContext = (AppDbContext)context;
        if (appDbContext.AccessCodes.Find("cat") == null)
        {
            AccessCode newAccessCode = new AccessCode("cat", 10);
            appDbContext.AccessCodes.Add(newAccessCode);

            context.SaveChanges();
        }
    });
});

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

if (app.Environment.IsProduction())
{
    app.UseExceptionHandler();
}

app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate = "{RequestUserAgent} {RequestMethod} {RequestPath} ..{Elapsed}ms.. {StatusCode}";

    options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
    {
        diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
        diagnosticContext.Set("RequestScheme", httpContext.Request.Scheme);
        diagnosticContext.Set("RequestUserAgent", httpContext.Request.Headers.UserAgent);
    };
});

app.UseCors("Frontend");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseRateLimiter();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHealthChecks("/healthz");

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action}"
);

app.Run();
