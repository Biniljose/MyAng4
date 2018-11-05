import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders } from '@angular/common/http/src/headers';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) { }
  headlinesUrl = 'http://localhost:49906/api/HeadlinesNews/GetAllHeadlines';
  categoryUrl= 'http://localhost:49906/api/HeadlinesNews/GetSelectedCategoryNews?selCategory=';
  searchUrl= 'http://localhost:49906/api/HeadlinesNews/GetSearchNewsDetails?searchVal=';
  newsApiURL = 'http://localhost:49906/api/FavouriteNews';
  newsApiDeleteURL = 'http://localhost:49906/api/FavouriteNews?id=';
  private messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Service Error");
  }
  getHeadlines(): Observable<any> {    
    return this.http.get(this.headlinesUrl)
    .catch(this.errorHandler);
  }
  getCategories(value: any): Observable<any> {
    return this.http.get(this.categoryUrl+value)
    .catch(this.errorHandler);
  }
  getSearchResults(value: any): Observable<any> {
    return this.http.get(this.searchUrl+value)
    .catch(this.errorHandler);
  }  
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  GetFavoriteNews(): Observable<any> {
    return this.http.get(this.newsApiURL)
    .catch(this.errorHandler);
  }
  AddFavouriteNews(news): Observable<any> {
      return this.http.post(this.newsApiURL, news)
      .catch(this.errorHandler);
  }
  DeleteFavouriteNews(title): Observable<any> {
    return this.http.delete(this.newsApiDeleteURL + title)
    .catch(this.errorHandler);
}
}
