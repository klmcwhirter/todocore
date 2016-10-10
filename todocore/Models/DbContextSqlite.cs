using Microsoft.EntityFrameworkCore;

namespace todocore.Models
{
    public class DbContextSqlite : DbContext
    {
        public DbSet<Todo> Todos { get; set; }

        public DbSet<TodoComment> TodoComments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlite("Filename=./todocore.db");
        }
    }
}