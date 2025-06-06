var builder = DistributedApplication.CreateBuilder(args);

//var cache = builder.AddRedis("cache");

var dataService = builder.AddProject<Projects.UCMS_DataService>("dataService")
    .WithExternalHttpEndpoints();

/*var apiService = builder.AddProject<Projects.UCMS_ApiService>("apiservice")
    .WithReference(dataService)
    .WaitFor(dataService);*/

var aiService = builder.AddProject<Projects.UCMS_AIService>("aiservice")
    .WithExternalHttpEndpoints()
    .WithReference(dataService)
    .WaitFor(dataService);

builder.AddProject<Projects.UCMS_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    /*.WithReference(cache)
    .WaitFor(cache)
    .WithReference(apiService)
    .WaitFor(apiService)*/
    .WithReference(dataService)
    .WaitFor(dataService);

builder.AddNpmApp("frontendreactvite", "../UCMS.FrontendReactVite")
    .WithReference(dataService)
    .WithReference(aiService)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();


/*
var dataService = builder.AddProject<Projects.UCMS_DataService>("dataService")
    .WithExternalHttpEndpoints();

var aiService = builder.AddProject<Projects.UCMS_AIService>("aiservice")
    .WithExternalHttpEndpoints()
    .WithReference(dataService)
    .WaitFor(dataService);

builder.AddProject<Projects.UCMS_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(dataService)
    .WaitFor(dataService);

builder.AddNpmApp("frontendreactvite", "../UCMS.FrontendReactVite")
    .WithReference(dataService)
    .WithReference(aiService)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();
*/