using Microsoft.EntityFrameworkCore;
using Luno.Server.Models;

namespace Luno.Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Add your DbSet properties here for your entities
    public DbSet<User> Users { get; set; }
} 