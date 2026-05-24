FROM dhi.io/dotnet:10.0.203-sdk-debian13 AS build
WORKDIR /src
COPY backend.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

FROM dhi.io/aspnetcore:10.0.7-debian13 AS run
WORKDIR /app
COPY --from=build /app .
HEALTHCHECK CMD curl --fail http://localhost:8080/healthz || exit 1
ENTRYPOINT ["dotnet", "backend.dll"]