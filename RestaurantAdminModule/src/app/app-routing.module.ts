import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantHomeComponent } from './components/restaurant-home/restaurant-home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  {path:'', component : RestaurantHomeComponent},
  { path: 'error', component: ErrorPageComponent },
  {path : '**', component : RestaurantHomeComponent, pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
