
import { Component, OnInit} from '@angular/core';
import { ConfigService } from '../config.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
// Dashboard componnet
export class DashboardComponent implements OnInit {
  message: string;
  topHeadLines: Object[];
  catHeadLines: Object[];
  favNewsList: Object[];
  constructor(private config: ConfigService, private router: Router) {


    // Call the favourite news service to konw the already favourited news items
    this.config.GetFavoriteNews().subscribe(favResult => {
      this.favNewsList = favResult});

      // call the headline news api
    this.config.getHeadlines().subscribe(result => {
      this.topHeadLines=JSON.parse(result).articles;
      console.log(this.topHeadLines);}
    );

    //Call the default(general) category api
    this.config.getCategories('general').subscribe(resultCat => {
      this.catHeadLines=JSON.parse(resultCat).articles;
    });
   }
  options = ['general', 'entertainment', 'business', 'health', 'science', 'sports', 'technology'];
  optionSelected: any;
  selectedOpt= 'general';
    ngOnInit() {
    this.config.currentMessage.subscribe(message => this.message = message);
  }  

  //Method for Catogury dropdownc change
 CategoryChanged(event){
  this.config.getCategories(event).subscribe(resultCat => {    
    this.catHeadLines=JSON.parse(resultCat).articles;
  });
 }

 //service call to add the favourite news to db
 AddFavouriteNews(details, event) {
   const news = { 'Id': 8, 'Title': details.title, 'Description': details.description, 'ImageURL': details.urlToImage};
   console.log(news);
   this.config.AddFavouriteNews(news).subscribe(
    res => {
     
        if(event.srcElement.innerHTML ==='Favourite' ){          
          event.srcElement.innerHTML="Un Favourite";
          event.srcElement.classList.remove("btn-primary");
          event.srcElement.classList.remove("favorite-btn");
          event.srcElement.classList.add("unfavorite-btn");
          event.srcElement.classList.add("btn-danger");          
          alert("News added to favourites!!");
        } 
         
 });
}

//Finding the favorite news items based on the title
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

  //Method to call the add / remove favourite item
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

  //Call to delete the favourite item from the db
  RemoveFavouriteNews(favNews, event)
  {    
    for(var i=0; i< this.favNewsList.length; i++)
    {
        if (this.favNewsList[i]["title"] == favNews.title)
        {          
          this.config.DeleteFavouriteNews(this.favNewsList[i]["id"]).subscribe(res => {
      
            // cahnge the favourite to un-favourite css
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
}

 
