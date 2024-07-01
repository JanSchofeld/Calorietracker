import { Component, Injectable } from '@angular/core';
import { ProfiledataService } from '../profiledata.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfiledataService]
})

@Injectable({
  providedIn: 'root'
})

export class ProfileComponent {
  name: string = ''; 
  height: string = '';
  startweight: string = '';
  currentweight: string = '';

  profilevalid: boolean = true;
  profileIsSet: boolean = false;
  isEditing: boolean = false;

  profileForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    height: new FormControl("", [Validators.required, Validators.pattern('[0-9]*') , Validators.min(1)]),
    startweight: new FormControl("", [Validators.required, Validators.pattern('[0-9]*[.,]?[0-9]?'), Validators.min(1)]),
    currentweight: new FormControl("", [Validators.pattern('[0-9]*[.,]?[0-9]?'), Validators.min(1)])
  })

  onDelete(){
    this.dataservice.deleteProfile();
    this.profileIsSet = false;
    this.UnlockFormControls();
    this.LoadValuesIntoForm();
  }

  onEdit(){
    this.UnlockFormControls();
    this.isEditing = true;
  }

  onCancelEdit(){
    this.LockFormControls();
    this.isEditing = false;
    this.LoadValuesIntoForm();
  }

  onSubmit(){
    this.name = this.profileForm.controls['name'].value;
    this.height = this.profileForm.controls['height'].value;
    this.startweight = this.profileForm.controls['startweight'].value;
    if(this.profileForm.controls['currentweight'].dirty){
      this.currentweight = this.profileForm.controls['currentweight'].value;
      this.dataservice.setWeight(this.currentweight);
    }

    this.dataservice.setName(this.name);
    this.dataservice.setHeight(this.height);
    this.dataservice.setStartweight(this.startweight);

    this.LockFormControls();

    this.isEditing = false;
    this.profileIsSet = true;
  }

  LockFormControls(){
    this.profileForm.controls['name'].disable();
    this.profileForm.controls['height'].disable();
    this.profileForm.controls['startweight'].disable();
  }

  UnlockFormControls(){
    this.profileForm.controls['name'].enable();
    this.profileForm.controls['height'].enable();
    this.profileForm.controls['startweight'].enable();
  }

  LoadValuesIntoForm(){
    this.profileForm.controls['name'].setValue(this.dataservice.getName());
    this.profileForm.controls['height'].setValue(this.dataservice.getHeight());
    this.profileForm.controls['startweight'].setValue(this.dataservice.getStartweight());
    
    this.currentweight = this.dataservice.getWeight();
  }

  /*onSubmitAlt(_name: string, _height: number, _startweight: number){
    if(_name == '' || isNaN(_height) || isNaN(_startweight)){
      this.profilevalid = false;
      return;
    }

    this.name = _name;
    this.height = _height;
    this.startweight = _startweight;
  
    this.dataservice.setName(this.name);
    this.dataservice.setHeight(this.height);
    this.dataservice.setStartweight(this.startweight);

    this.router.navigateByUrl('/calories');
  }*/

  ngOnInit(){
    this.LoadValuesIntoForm();
    this.profileForm.controls['currentweight'].disable();

    if(this.dataservice.getName().length > 0){
      this.profileIsSet = true;
      this.LockFormControls();
    } else{
      this.profileIsSet = false;
      this.UnlockFormControls();
    }
  }

  constructor(
    public dataservice: ProfiledataService,
    private router: Router){}
}