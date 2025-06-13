using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Luno.Server.Data;
using Microsoft.Data.SqlClient;

namespace Luno.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatabaseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DatabaseController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("tables")]
        public async Task<ActionResult<List<TableInfo>>> GetTables()
        {
            try
            {
                // Get the connection string
                var connectionString = _context.Database.GetConnectionString();
                
                if (string.IsNullOrEmpty(connectionString))
                {
                    return BadRequest("Connection string is null or empty");
                }
                
                var tables = new List<TableInfo>();

                // Use raw SQL connection to query INFORMATION_SCHEMA
                using (var connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();
                    
                    var sql = @"
                        SELECT 
                            TABLE_NAME as Name,
                            TABLE_SCHEMA as [Schema]
                        FROM INFORMATION_SCHEMA.TABLES 
                        WHERE TABLE_TYPE = 'BASE TABLE'
                        ORDER BY TABLE_SCHEMA, TABLE_NAME";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                tables.Add(new TableInfo
                                {
                                    Name = reader["Name"].ToString() ?? "",
                                    Schema = reader["Schema"].ToString() ?? ""
                                });
                            }
                        }
                    }
                }

                return Ok(tables);
            }
            catch (SqlException sqlEx)
            {
                return BadRequest($"SQL Error: {sqlEx.Message}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving tables: {ex.Message} | Stack: {ex.StackTrace}");
            }
        }
    }

    // Model to represent table information
    public class TableInfo
    {
        public string Name { get; set; } = string.Empty;
        public string Schema { get; set; } = string.Empty;
    }
}