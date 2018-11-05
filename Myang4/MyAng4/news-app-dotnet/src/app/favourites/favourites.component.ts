import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favNewList: Object[];
  constructor(private config: ConfigService, private router: Router) {
   this.GetFavNews();
   }
   
   //Call for the Get the favourite item api from DB
GetFavNews(){
  this.config.GetFavoriteNews().subscribe(favResult => {
    this.favNewList = favResult;
    console.log(favResult);
  });
}
  ngOnInit() {
    console.log('logging fo id');
  }

  //Method to call the delete favourite item api
  DeleteFavouriteNews(fnews){
    this.config.DeleteFavouriteNews(fnews.id).subscribe(
      val => this.GetFavNews());
  }
}
