using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MusicApp.Server.Repository;
using MusicApp.Server.Repository.Interfaces;
using Save__plan_your_trips.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<MusicAppDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("MusicAppDbConnectionString")));

builder.Services.AddTransient<IMusicRepository, MusicRepository>();
builder.Services.AddTransient<MusicAppDbContext>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
