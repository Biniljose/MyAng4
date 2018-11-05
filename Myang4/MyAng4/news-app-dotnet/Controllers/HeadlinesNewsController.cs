
using Microsoft.AspNetCore.Mvc;
using NewsAppWApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
namespace NewsAppWApi.Controllers
{
  [Route("api/[controller]/[Action]")]
  public class HeadlinesNewsController : Controller
  {
    /// <summary>
    /// GetAllHeadlines - API to get all top headlines
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public IActionResult GetAllHeadlines()
    {
      using (var client = new HttpClient())
      {
        string headlineUrl = "https://newsapi.org/v2/top-headlines?country=in&apikey=1c6749a7099c4e4e8a1d08b876aaa663&page=1";
        client.BaseAddress = new Uri(headlineUrl);
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        var response = client.GetAsync("").Result;
        if (response.IsSuccessStatusCode)
        {
          return Json(response.Content.ReadAsStringAsync().Result);
        }
      }
      return NotFound();
    }
    /// <summary>
    /// GetSelectedCategoryNews
    /// </summary>
    /// <param name="selCategory"></param>
    /// <returns></returns>
    [HttpGet]
    public IActionResult GetSelectedCategoryNews(string selCategory)
    {
      using (var client = new HttpClient())
      {
        string catUrl = "https://newsapi.org/v2/top-headlines?category=<<news_category>>&apikey=1c6749a7099c4e4e8a1d08b876aaa663&page=1";
        catUrl = catUrl.Replace("<<news_category>>", selCategory);
        client.BaseAddress = new Uri(catUrl);
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        var response = client.GetAsync("").Result;
        if (response.IsSuccessStatusCode)
        {
          return Json(response.Content.ReadAsStringAsync().Result);
        }
      }
      return NotFound();
    }
    /// <summary>
    /// GetSearchNewsDetails
    /// </summary>
    /// <param name="searchVal"></param>
    /// <returns></returns>
    [HttpGet]
    public IActionResult GetSearchNewsDetails(string searchVal)
    {
      List<FavouriteNews> newsDetails = new List<FavouriteNews>();
      using (var client = new HttpClient())
      {
        string srchUrl = "https://newsapi.org/v2/everything?q=<<search_text>>&apiKey=1c6749a7099c4e4e8a1d08b876aaa663&language=en&page=1";
        srchUrl = srchUrl.Replace("<<search_text>>", searchVal);
        client.BaseAddress = new Uri(srchUrl);
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        var response = client.GetAsync("").Result;
        if (response.IsSuccessStatusCode)
        {
          return Json(response.Content.ReadAsStringAsync().Result);
        }
      }
      return NotFound();
    }
  }
}
