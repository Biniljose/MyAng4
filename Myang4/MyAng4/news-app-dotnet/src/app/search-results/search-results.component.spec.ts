import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from '../../../src/app/search-results/search-results.component';
import { FavouritesComponent } from '../../../src/app/favourites/favourites.component';
import { DashboardComponent } from '../../../src/app/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../../src/app/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from '../../../src/app/config.service';
import { APP_BASE_HREF } from '@angular/common';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ FavouritesComponent, DashboardComponent, SearchResultsComponent  ],
        imports: [
          BrowserModule,
          AppRoutingModule  ,
          FormsModule,
          ReactiveFormsModule  , HttpClientModule
        ],
        providers: [ ConfigService, {provide: APP_BASE_HREF, useValue: '/'}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
