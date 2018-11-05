import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, Params  } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']  
})
export class SearchResultsComponent implements OnInit {
  message: string;
  searchResults: Object[];
  favNewsList: Object[];
  searchVal: any;
  paramsSub: any;
  constructor(private config: ConfigService, private router: Router, private activatedRoute: ActivatedRoute) {
    
   }
   
   //Call for the Add favourite item api 
   AddFavouriteNews(details, event) {
    const news = { 'Id': 8, 'Title': details.title, 'Description': details.description, 'ImageURL': details.urlToImage};
    console.log(news);
    this.config.AddFavouriteNews(news).subscribe(
     res => {
      
      // CSS cahnge to un-favorite 
      if(event.srcElement.innerHTML ==='Favourite' ){          
        event.srcElement.innerHTML="Un Favourite";
        event.srcElement.classList.remove("btn-primary");
        event.srcElement.classList.remove("favorite-btn");
        event.srcElement.classList.add("unfavorite-btn");
        event.srcElement.classList.add("btn-danger");           
         } 
         alert("News added to favourites!!"); 
  });
   }

   //Checking the favourite items list by the title 
   CheckFavs(news) {    
    var found = false;
      for(var i=0; i< this.favNewsList.length; i++)
      {
          if (this.favNewsList[i]["title"] == news.title)
          {
            found = true;
            break;
          }
      }
      return found;   
    }

    //Method call for add / remove favourite tiem api call
    AddRemoveFavouriteNews(favNews, event)
  {    
    if(event.srcElement.innerHTML ==='Favourite' ){
      this.AddFavouriteNews(favNews,event);
    }
    else {
      this.RemoveFavouriteNews(favNews, event);
    }
    this.config.GetFavoriteNews().subscribe(favResult => {
      this.favNewsList = favResult});
  }
    RemoveFavouriteNews(favNews, event)
  {
    for(var i=0; i< this.favNewsList.length; i++)
    {
        if (this.favNewsList[i]["title"] == favNews.title)
        {
          this.config.DeleteFavouriteNews(this.favNewsList[i]["id"]).subscribe( 
            res => {
      
              // change CSS style to Favourite buton
              if(event.srcElement.innerHTML ==='Un Favourite' ){          
                event.srcElement.innerHTML="Favourite";
                event.srcElement.classList.remove("unfavorite-btn");
                event.srcElement.classList.remove("btn-danger"); 
                event.srcElement.classList.add("btn-primary");
                event.srcElement.classList.add("favorite-btn");                                  
                 } 
                 alert("News removed from favourites!!"); 
          });
        }
    }
  }  

  //Method fro search news item call
  SearchNews(searchTxt){
    this.config.GetFavoriteNews().subscribe(favResult => {
      this.favNewsList = favResult});
    this.config.currentMessage.subscribe(message => this.message = message);       
    this.config.getSearchResults(this.message).subscribe(rslt => {
      this.searchResults=JSON.parse(rslt).articles;
    });
  }
  ngOnInit() {        
    //for reloading the  search compoenent  once the search text is changed and subscribed
    this.activatedRoute.params.subscribe((params: Params) => {
      this.searchVal = params['searchTxt'];
      this.SearchNews(this.searchVal);
      
    });
  }
  ngOnDestroy() {
    if (this.paramsSub != undefined)
      this.paramsSub.unsubscribe();
  }  
}

