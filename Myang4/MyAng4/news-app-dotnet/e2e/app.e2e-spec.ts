import { AppPage } from './app.po';
import {browser, by, element} from 'protractor'

describe('news-app-dotnet App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });

  it('should display headline section', () => {
    page.navigateTo();
    expect(element(by.css('.news-headlins')).isPresent()).toBe(true);
  });

  it('should display Favourite button for news', () => {
    page.navigateTo();
    expect(element(by.css('.favorite-btn')).isPresent()).toBe(true);
  });

  it('should display category dropdown', () => {
    page.navigateTo();
    expect(element(by.css('.dropdown')).isPresent()).toBe(true);
  });

  it('should display news headlines.', () => {
    page.navigateTo();
    expect(element(by.css('.news-poster')).isPresent()).toBe(true);
    expect(element(by.css('.news-title')).isPresent()).toBe(true);
    expect(element(by.css('.news-text')).isPresent()).toBe(true);    
  });

  it('should display search option.', () => {
    page.navigateTo();
    expect(element(by.css('.srch-news')).isPresent()).toBe(true);    
  }); 

  it('It should search news based on search text', () => {
    page.navigateTo();
    element(by.css('.srch-news')).sendKeys('test');
    element(by.id('search-btn')).click();
    expect(browser.getCurrentUrl()).toContain('search');
  });

  it('It should navigate to favurites page', () => {
    page.navigateTo();    
    element(by.id('FavouritesID')).click();
    expect(browser.getCurrentUrl()).toContain('favourite');
  });
});
