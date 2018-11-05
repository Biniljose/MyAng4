import { Component, OnInit} from '@angular/core';
import { ConfigService } from './config.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Server } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  sub : Subscription;
  searchText = '';
  constructor(private config: ConfigService, private router: Router) {
    
  }
  ngOnInit() {
  this.sub = this.config.currentMessage.subscribe((val) => {
    if (val == "ok") {
      this.searchText = "";
    }
  });
}

//Serach news mehtod
  getResults(searchVal: string) {

    if(searchVal.length!=0)
    {      
      this.config.changeMessage(searchVal);      
      this.router.navigate(['/search-here',searchVal]);
    }
    else{
      alert("Please enter text.");
    }
 }
 ngOnDestroy() {
   if (this.sub != undefined)
    this.sub.unsubscribe();
 }
}
