import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from '../../../src/app/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../../src/app/app-routing/app-routing.module';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../../../src/app/config.service';
import { SearchResultsComponent } from '../../../src/app/search-results/search-results.component';
import { FavouritesComponent } from '../../../src/app/favourites/favourites.component';
import { APP_BASE_HREF } from '@angular/common';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, SearchResultsComponent, FavouritesComponent ],
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
