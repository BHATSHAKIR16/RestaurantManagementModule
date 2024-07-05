import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurantmodel } from 'src/app/models/restaurant.model';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UpdateRestaurantComponent } from 'src/app/update-restaurant/update-restaurant.component';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {
  @ViewChild(AddRestaurantComponent) addRestaurantComp! : AddRestaurantComponent;
  @ViewChild(UpdateRestaurantComponent) updateRestaurantComp! : UpdateRestaurantComponent;
  private deleteId : string = ''
  restaurantList : Restaurantmodel[] = []
  showDeletePopup : boolean = false;
  constructor(private http : HttpClient, private restService : RestaurantService) { }

  ngOnInit(): void {
  this.getRestaurantList();
  }
  
  getRestaurantList(){
    this.restService.getRestaurants().subscribe((response : Restaurantmodel[])=>{
      this.restaurantList = response;
    })
  }

  addRestaurant(){
    this.addRestaurantComp.openModal();
  }

  openDeleteModal(id : string){
    this.showDeletePopup = true;
    this.deleteId = id;
  }
  closeModal(){
    this.showDeletePopup = false;
  }
  deleteRestaurant(){
    this.restService.deleteRestaurant(this.deleteId).subscribe((res:Restaurantmodel)=>{
      alert('Restaurant Deleted')
      this.closeModal();
      this.getRestaurantList();
    })
  }
  updateRestaurant(selectedRestaurant : Restaurantmodel){
    this.updateRestaurantComp.openModal(selectedRestaurant)
  }
}
