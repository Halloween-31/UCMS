var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var apiService = builder.AddProject<Projects.UCMS_ApiService>("apiservice");

builder.AddProject<Projects.UCMS_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(cache)
    .WaitFor(cache)
    .WithReference(apiService)
    .WaitFor(apiService);

var dataService = builder.AddProject<Projects.UCMS_DataService>("dataService")
    .WithExternalHttpEndpoints();

builder.AddNpmApp("frontendreactvite", "../UCMS.FrontendReactVite")
    .WithReference(dataService)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
