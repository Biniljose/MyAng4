using NewsAppWApi.Models.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System;

namespace NewsAppWApi.Models.DataManager
{
  public class FavNewsManager : IDataRepository
  {
    FavNewsContext ctx;
    public FavNewsManager(FavNewsContext c)
    {
      ctx = c;
    }

    /// <summary>
    /// Method to get all favourites
    /// </summary>
    /// <returns></returns>

    public IEnumerable<FavouriteNews> GetFavorites()
    {
      try
      {
        var favNews = new List<FavouriteNews>();
        var news = ctx.FavouriteNews.ToList();
        foreach (var item in news)
        {
          FavouriteNews fNews = new FavouriteNews();
          fNews.Id = item.Id;
          fNews.Title = item.Title;
          fNews.ImageURL = item.ImageURL;
          fNews.Description = item.Description;
          favNews.Add(fNews);
        }

        return favNews;
      }
      catch
      {
        throw new ArgumentNullException("FavouriteNews");
      }
    }

    /// <summary>
    /// Method to add a news item to favourite DB
    /// </summary>
    /// <param name="favNews"></param>
    /// <returns></returns>
    public FavouriteNews AddFavorite(FavouriteNews favNews)
    {
      try
      {
        if (!ctx.FavouriteNews.Any(n => n.Title.Equals(favNews.Title) && n.Description.Equals(favNews.Description) && n.ImageURL.Equals(favNews.ImageURL)))
        {
          FavouriteNews news = new FavouriteNews();
          news.Title = favNews.Title;
          news.ImageURL = favNews.ImageURL;
          news.Description = favNews.Description;
          ctx.FavouriteNews.Add(news);
          ctx.SaveChanges();
          return news;
        }
        else
        {
          //already exists in the favourites DB
          return null;
        }
      }
      catch
      {
        throw new ArgumentNullException("FavouriteNews");
      }
    }

    /// <summary>
    /// Method to delete an item from Favourite DB
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public FavouriteNews DeleteFavorite(int id)
    {
      try
      {
        var newsToRemove = ctx.FavouriteNews.FirstOrDefault(n => n.Id == id);
        if (newsToRemove != null)
        {
          ctx.FavouriteNews.Remove(newsToRemove);
          ctx.SaveChanges();
          return newsToRemove;
        }
        else
        {
          // no news found to delete
          return null;
        }
      }
      catch
      {
        throw new ArgumentNullException("FavouriteNews");
      }
    }
  }
}
