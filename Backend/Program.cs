using Factura_Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Obtener cadena de conexión desde appsettings.json
var conexion = builder.Configuration.GetConnectionString("cn");

// Configurar DbContext para SQL Server
builder.Services.AddDbContext<DatosDBContext>(
    op => op.UseSqlServer(conexion)
);

builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS
builder.Services.AddCors(op => {
    op.AddPolicy("facturacion", credenciales => {
        credenciales.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
    });
});

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("facturacion");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

