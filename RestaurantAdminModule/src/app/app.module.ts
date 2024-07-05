import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RestaurantHomeComponent } from './components/restaurant-home/restaurant-home.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { CustomHttpInterceptor } from './Interceptors/custom-http.interceptor';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RestaurantHomeComponent,
    AddRestaurantComponent,
    UpdateRestaurantComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
