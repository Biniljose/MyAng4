using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NewsAppWApi.Models;
using NewsAppWApi.Models.Repository;
using NewsAppWApi.Models.DataManager;
using NewsAppWApi.Controllers;
using System.Linq;
using Xunit;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Test
{
    public class UnitTest1
    {
        private IDataRepository _repo { get; set; }
        private FavNewsContext _context;        
        private int DeletedNewsId;
        public UnitTest1()
        {

            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.test.json")
                .Build();
            

            var serviceProvider = new ServiceCollection()
            .AddEntityFrameworkSqlServer()
            .BuildServiceProvider();
            string conString = config.GetConnectionString("Default");
            var optionsBuilder = new DbContextOptionsBuilder<FavNewsContext>();
            optionsBuilder.UseSqlServer(conString)
            .UseInternalServiceProvider(serviceProvider);
            _context = new FavNewsContext(optionsBuilder.Options);
            _context.Database.Migrate();
            _repo = new FavNewsManager(_context);
        }
        
        /// <summary>
        /// Test Get All Favorite News
        /// </summary>
        [Fact]
        public void TestGetAllFavoriteNews()
        {
            var favController = new FavouriteNewsController(_repo);
            var favNewsList = favController.GetAll();
            Assert.True(favNewsList != null);
        }
        /// <summary>
        /// Add new news
        /// </summary>
        [Fact]
        public void TestPostFavoriteNews()
        {
            var favController = new FavouriteNewsController(_repo);
            FavouriteNews testNews = new FavouriteNews();
            int topId = 0;
            testNews.Id = topId + 1;
            testNews.Title = "Test Title";
            testNews.Description = "Test description";
            testNews.ImageURL = " Test URL";
            IActionResult result = favController.Post(testNews);
            var okResult = result as StatusCodeResult;            
            Assert.Equal(200, okResult.StatusCode);            
        }

        /// <summary>
        /// Add new news
        /// </summary>
        [Fact]
        public void TestPostFavoriteNews_Negative()
        {
            var favController = new FavouriteNewsController(_repo);
            FavouriteNews testNews = new FavouriteNews();
            int topId = 0;
            testNews.Id = topId + 1;
            testNews.Title = "Test Title";
            testNews.Description = "Test description";
            testNews.ImageURL = " Test URL";
            IActionResult result = favController.Post(testNews);
            var okResult = result as StatusCodeResult;            
            if (okResult.StatusCode == 200)
            {
                //save once more
                result = favController.Post(testNews);
                okResult = result as StatusCodeResult;
                Assert.Equal(409, okResult.StatusCode); //already exists
            }
            
        }

        /// </summary>
        [Fact]
        public void TestPostFavoriteNews_Negative_Null()
        {
            var favController = new FavouriteNewsController(_repo);
            
            IActionResult result = favController.Post(null);
            var okResult = result as StatusCodeResult;
            Assert.Equal(400, okResult.StatusCode); //Bad request
            
        }

        /// <summary>
        /// Test Delete Favorite News
        /// </summary>
        [Fact]
        public void TestDeleteFavoriteNews()
        {
            var favController = new FavouriteNewsController(_repo);
            FavouriteNews testNews = new FavouriteNews();
            int topId = 0;
            testNews.Id = topId + 1;
            testNews.Title = "Test Title";
            testNews.Description = "Test description";
            testNews.ImageURL = " Test URL";
            IActionResult result = favController.Post(testNews);
            var okResult = result as StatusCodeResult;
            if (okResult.StatusCode == 200)
            {
                topId = _context.FavouriteNews.Select(f => f.Id).FirstOrDefault();
                result = favController.Delete(topId);
                Assert.Equal(200, okResult.StatusCode);
            }
        }


        /// <summary>
        /// Test Delete Favorite News - Negative
        /// </summary>
        [Fact]
        public void TestDeleteFavoriteNews_Negative()
        {
            var favController = new FavouriteNewsController(_repo);

            IActionResult result = favController.Delete(0);
            var okResult = result as StatusCodeResult;
            Assert.Equal(404, okResult.StatusCode);
        }

        /// <summary>
        /// Testing for getting category wise news details
        /// </summary>
        [Fact]
        public void TestGetSelectedCategoryNews()
        {
            var hdlNews = new HeadlinesNewsController();
            var data = hdlNews.GetSelectedCategoryNews("general");
            
            Assert.True(data != null);
        }
        /// <summary>
        /// To test news search
        /// </summary>
        [Fact]
        public void TestGetSearchNewsDetails()
        {
            var hdlNews = new HeadlinesNewsController();
            var data = hdlNews.GetSearchNewsDetails("test");
            Assert.True(data != null);
        }
        /// <summary>
        /// Test for getting all headlines
        /// </summary>
        [Fact]
        public void TestGetHeadlines()
        {
            var hdlNews = new HeadlinesNewsController();
            var data = hdlNews.GetAllHeadlines();
            
            Assert.True(data != null);
        }

    }
}