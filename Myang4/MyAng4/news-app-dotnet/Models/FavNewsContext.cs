using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsAppWApi.Models
{
  /// <summary>
  /// Favorite News DB Context
  /// </summary>
    public class FavNewsContext : DbContext
    {
        public FavNewsContext(DbContextOptions opts) : base(opts)
        {
        }

        public DbSet<FavouriteNews> FavouriteNews { get; set; }          
        protected override  void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        { }
    }
}
