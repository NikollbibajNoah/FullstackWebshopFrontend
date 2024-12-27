using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class DBStoreContext : DbContext
    {
        public DbSet<ProductData> Products { get; set; }
        public DBStoreContext(DbContextOptions<DBStoreContext> options) : base(options)
        {
        }
    }
}
