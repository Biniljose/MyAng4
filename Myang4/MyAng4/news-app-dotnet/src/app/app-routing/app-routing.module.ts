import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { FavouritesComponent } from '../favourites/favourites.component';

const routes: Routes = [
    {
        path: 'search-here/:searchTxt',
        component: SearchResultsComponent
    },
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'favourite',
        component: FavouritesComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
