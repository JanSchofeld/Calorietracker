import { Component, OnInit } from '@angular/core';
import { Food } from '../model/Food';
import { FoodService } from '../food.service';
import { Days } from '../model/Days';
import { formatDate } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.css']
})

export class CaloriesComponent implements OnInit {

  foodArray: Food[] = [];
  dayArray: Days[] = [];
  today = formatDate(new Date(), 'YYYY-MM-dd', 'en-US');
  totalCal: number = 0;
  
  foodForm: FormGroup = new FormGroup({
    food: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    amount: new FormControl("", [Validators.required]),
    calories: new FormControl("", [Validators.required])
  })

  constructor(
    private foodservice: FoodService,
  ) { }

/*
  addFood(food: string, amount: number, calories: number) {
    this.foodArray = this.foodArray || [];

    if(food != "" && amount > 0 && calories > 0){
      this.foodArray.push(new Food(food, amount, calories));
    }
    this.foodservice.setFood(this.foodArray);
  }*/

  getFood() {
    this.foodArray = this.foodservice.getFood();
  }
  getDays() {
    this.dayArray = this.foodservice.getDays();
  }

  onDelete() {
    if(this.foodArray !== null){
    this.foodservice.clearFood();
    this.getFood();
    }
  }

  onSubmit() {
    this.foodArray = this.foodArray || [];

    var food = this.foodForm.controls['food'].value;
    var amount = this.foodForm.controls['amount'].value;
    var calories = this.foodForm.controls['calories'].value;

    if(food != "" && amount > 0 && calories > 0){
      this.foodArray.push(new Food(food, amount, calories));
    }
    this.foodservice.setFood(this.foodArray);
  }

  saveDay() {
    this.dayArray = this.dayArray || [];

    if(this.foodArray != null){
      for (let fd of this.foodArray) {
        this.totalCal += fd.calories;
      }

      if(this.dayArray.length > 0){
        let todayIndex = this.dayArray.length - 1;

        if(this.dayArray[todayIndex].day == this.today){
            this.dayArray[todayIndex].totalcalories += this.totalCal;
          } else{
            this.dayArray.push(new Days(this.today, this.totalCal));
          }
      } else{
        this.dayArray.push(new Days(this.today, this.totalCal));
      }

      this.totalCal = 0;
      this.foodservice.setDays(this.dayArray);
      this.onDelete();
    }
  }

  onDeleteDays() {
    this.foodservice.clearDays();
    this.dayArray = this.foodservice.getDays();
  }

  ngOnInit() {
    this.getFood();
    this.getDays();
  }
}