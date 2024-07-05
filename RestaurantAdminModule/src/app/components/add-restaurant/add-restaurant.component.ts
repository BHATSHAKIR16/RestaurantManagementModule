import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurantmodel } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  @Output() updateRestaurants : EventEmitter<void> = new EventEmitter();
  addRestaurantForm : FormGroup;
  submitted : boolean = false;
  isVisible : boolean = false;
  
  constructor(private fb : FormBuilder, private restService : RestaurantService) {
    this.addRestaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      cuisine: [''],
      image: ['']
    });
   }

  ngOnInit(): void {
    console.log(this.isVisible)
}
  onSubmit(){
    if(this.addRestaurantForm.valid){
      this.submitted = true;
      this.restService.addRestaurant(this.addRestaurantForm.value).subscribe((res : Restaurantmodel)=>{
        alert('Restaurant added');
        console.log(res);
        this.updateRestaurants.emit();
      })
    }
    this.closeModal();

  }
  openModal(){
    this.isVisible = true;
  }
  closeModal(){
    this.addRestaurantForm.reset();
    this.isVisible = false;
  }
}
