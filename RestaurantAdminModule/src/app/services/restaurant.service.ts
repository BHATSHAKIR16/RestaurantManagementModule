import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Restaurantmodel } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  RestuarantData : Restaurantmodel[] = []
  private baseUrl = "http://localHost:3000/restaurants"
  constructor(private http : HttpClient) { }

  addRestaurant(data : Restaurantmodel) : Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
   
  getRestaurants() : Observable<any> {
    return this.http.get(this.baseUrl);
  }
  
  deleteRestaurant(id : string) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
  updateRestaurant(id : string, data : Restaurantmodel) : Observable<any> {
    console.log(id)
    console.log(data)
    const Id= +id
    return this.http.put(`${this.baseUrl}/${Id}`,data);
  }
}
