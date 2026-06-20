using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

public class EmailFormatTransformer: IOpenApiSchemaTransformer
{
    public Task TransformAsync(OpenApiSchema schema, OpenApiSchemaTransformerContext context, CancellationToken cancellationToken)
    {
        if (context.JsonPropertyInfo != null && context.JsonPropertyInfo.AttributeProvider is PropertyInfo propertyInfo && propertyInfo.GetCustomAttribute<EmailAddressAttribute>() != null)
        {
            schema.Format = "email";
        }

        return Task.CompletedTask;
    }
}