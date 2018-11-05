
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace NewsAppWApi.Models.Repository
{
  /// <summary>
  /// Repository Inteface
  /// </summary>
  public interface IDataRepository
  {

    IEnumerable<FavouriteNews> GetFavorites();
    FavouriteNews AddFavorite(FavouriteNews b);
    FavouriteNews DeleteFavorite(int id);
  }
}
