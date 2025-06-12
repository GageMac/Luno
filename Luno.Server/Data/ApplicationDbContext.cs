using Microsoft.EntityFrameworkCore;

namespace Luno.Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Add your DbSet properties here for your entities
    // Example: public DbSet<YourEntity> YourEntities { get; set; }
} 