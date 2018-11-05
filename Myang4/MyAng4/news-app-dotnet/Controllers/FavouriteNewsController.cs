using NewsAppWApi.Models;
using NewsAppWApi.Models.DataManager;
using NewsAppWApi.Models.Repository;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System;
using System.Net;

namespace NewsAppWApi.Controllers
{

  [Route("api/[controller]")]
  public class FavouriteNewsController : Controller
  {
    public IDataRepository _iRepo { get; set; }
    public FavouriteNewsController(IDataRepository repo)
    {
      _iRepo = repo;
    }

    // GET api/<controller>
    //API for the getting the favourite list
    [HttpGet]
    public IEnumerable<FavouriteNews> GetAll()
    {      
      try
      {
        return _iRepo.GetFavorites();
      }
      catch
      {
        return null;
      }
    }

    // POST api/<controller>
    //API for adding a news item to the favourite list
    [HttpPost]
    public IActionResult Post([FromBody]FavouriteNews news)
    {
      try
      {
        var result = _iRepo.AddFavorite(news);
        if (result != null)
        {
          //success
          return new StatusCodeResult((int)HttpStatusCode.OK);
        }
        else
        {
          //Title already exists
          return new StatusCodeResult((int)HttpStatusCode.Conflict);
        }
      }
      catch
      {
        //Bad request
        return new StatusCodeResult((int)HttpStatusCode.BadRequest);
      }
    }

    // DELETE api/<controller>/5
    //API for deleting a news item from the favourite list
    [HttpDelete]
    public IActionResult Delete(int id)
    {
      try
      {
        var result = _iRepo.DeleteFavorite(id);
        if (result != null)
        {
          //success
          return new StatusCodeResult((int)HttpStatusCode.OK);
        }
        else
        {
          //not found
          return new StatusCodeResult((int)HttpStatusCode.NotFound);
        }
      }
      catch
      {
        //bad request
        return new StatusCodeResult((int)HttpStatusCode.BadRequest);
      }
    }
  }
}
