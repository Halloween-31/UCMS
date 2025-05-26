using Microsoft.EntityFrameworkCore;
using UCMS.DataService.Data;
using UCMS.DataService.Extenstions;
using UCMS.DataService.UCSMAutoMapper;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddDbContext<UCMSDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddRepositories(); //builder.Services.AddScoped<IRepository<User>, Repository<User>>();
builder.Services.AddAutoMapper(typeof(UCSMAutoMapper));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Add health checks
app.MapDefaultEndpoints();

app.Run();
