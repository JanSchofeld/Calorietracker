import { Injectable } from '@angular/core';
import { Weights } from './model/Weights';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class ProfiledataService {

  public setName(name:string){
    localStorage.setItem('name', name);
  }
  public getName(){
    return localStorage.getItem('name') || '';
  }

  public setHeight(height:string){
    localStorage.setItem('height', height);
  }
  public getHeight(){
    return localStorage.getItem('height') || '';
  }

  public setStartweight(startWeight:string){
    localStorage.setItem('startWeight', startWeight);
  }
  public getStartweight(){
    return localStorage.getItem('startWeight') || '';
  }

  public setWeight(weight:string){
    localStorage.setItem('weight', weight);
  }
  public getWeight(){
    return localStorage.getItem('weight') || '';
  }

  public setHistory(weightarr: Weights[]){
    localStorage.setItem('weighthistory', JSON.stringify(weightarr));
  }
  public getHistory(){
    return JSON.parse(localStorage.getItem('weighthistory') || '[]');
  }

  public getBMI(){
    if(this.getWeight() == ''){
      return 10000 * Number(this.getStartweight()) / (Number(this.getHeight()) * Number(this.getHeight()));
    } else{
      return 10000 * Number(this.getWeight()) / (Number(this.getHeight()) * Number(this.getHeight()));
    }
  }

  public deleteProfile(){
    localStorage.clear();
  }

  constructor() {}
}