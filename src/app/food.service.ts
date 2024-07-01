import { Injectable } from '@angular/core';
import { Food } from './model/Food';
import { Days } from './model/Days';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  public setFood(foodarr: Food[]){
    localStorage.setItem('foodarr', JSON.stringify(foodarr));
  }

  public getFood(){
    return JSON.parse(localStorage.getItem('foodarr') || '[]');
  }

  public clearFood(){
    localStorage.setItem('foodarr', '');
  }

  public setDays(dayarr: Days[]){
    localStorage.setItem('dayarray', JSON.stringify(dayarr));
  }

  public getDays(){
    return JSON.parse(localStorage.getItem('dayarray') || '[]');
  }

  public clearDays(){
    localStorage.setItem('dayarray', '');
  }

  constructor() {}
}