import { Component, OnInit} from '@angular/core';
import { ProfiledataService } from '../profiledata.service';
import { Weights } from '../model/Weights';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css'],
  providers: [ProfiledataService]
})
export class WeightComponent implements OnInit{

  height:string = '';
  weight:string = this.getWeight();
  weighthistory:Weights[] = [];
  bmi:number = 0;
  today = new Date();

  weightForm: FormGroup = new FormGroup({
    newWeight: new FormControl("", [Validators.required, Validators.pattern('[0-9]*[.,]?[0-9]?'), Validators.min(1)]),
  })

  getWeight(){
    var startWeight = this.dataservice.getStartweight();
    var currentWeight = this.dataservice.getWeight();

    if(currentWeight != ''){
      this.weight = this.dataservice.getWeight() || '';
    } else if(startWeight != ''){
      this.weight = this.dataservice.getStartweight() || '';
    } else{
      this.weight = '';
    }
    return this.weight;
  }

  onClick(){
      this.weight = this.weightForm.controls['newWeight'].value;
      this.dataservice.setWeight(this.weight);

      this.weighthistory.push(new Weights(this.today, this.weight));
      this.dataservice.setHistory(this.weighthistory);
  }

  onDelete(){
    this.dataservice.setHistory([]);
    this.weighthistory = this.dataservice.getHistory();
  }

  ngOnInit(){
    this.height = this.dataservice.getHeight();
    this.weight = this.getWeight();
    this.weighthistory = this.dataservice.getHistory();

    this.weightForm.controls['newWeight'].setValue(this.weight.replace(',', '.'));
  }
  
  constructor(
    public dataservice:ProfiledataService,
  ){}
}