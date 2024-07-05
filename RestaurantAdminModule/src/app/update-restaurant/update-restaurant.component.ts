import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurantmodel } from '../models/restaurant.model';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {
  @Output() restaurantUpdated : EventEmitter<void> = new EventEmitter<void>();
  updateRestaurantForm! : FormGroup;
  updateId : string = '';
  isVisible : boolean = false;
  constructor(private fb : FormBuilder, private restService : RestaurantService) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.updateRestaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      cuisine: [''],
    })
  }
  updateResForm(selectedRestaurant : Restaurantmodel){
    this.updateId = selectedRestaurant?.id;
    this.updateRestaurantForm.patchValue({
      name : selectedRestaurant.name,
      description : selectedRestaurant.description,
      location : selectedRestaurant.location,
      cuisine : selectedRestaurant.cuisine
    })
  }
  openModal(selectedRestaurant : Restaurantmodel){
    this.isVisible = true;
    this.updateResForm(selectedRestaurant)
  }
  closeModal(){
    this.isVisible = false;
  }
  updateRestaurant(){
    this.restService.updateRestaurant(this.updateId, this.updateRestaurantForm.value).subscribe((response:Restaurantmodel)=>{
      alert('successfully updated the restaurant');
      this.restaurantUpdated.emit();
    })
  }
}
