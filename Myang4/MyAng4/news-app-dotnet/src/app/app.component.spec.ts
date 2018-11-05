import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ConfigService } from './config.service';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FavouritesComponent, DashboardComponent, SearchResultsComponent
      ],
      providers: [ ConfigService, {provide: APP_BASE_HREF, useValue: '/'}],
      imports: [
        BrowserModule,
        AppRoutingModule  ,
        FormsModule,
        ReactiveFormsModule  , HttpClientModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
