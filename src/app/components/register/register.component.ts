import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from './model/address.model';
import { User } from './model/user.model';
import { RegistrationService } from './service/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users:User[];

  registrationForm:FormGroup;
  addressForm:FormGroup;
  user:User;
  address:Address;


  constructor(private registrationService:RegistrationService) {}


  ngOnInit(): void {
    this.registrationService.getUsers().subscribe(data=>{
      this.users=data;


    });

    this.registrationForm=new FormGroup({
      fullName:new FormControl('',Validators.required),
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      mobileNo:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email:new FormControl('',[Validators.required,Validators.email]),
      role:new FormControl('',Validators.required),
      dateOfBirth:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),

    });

      this.addressForm=new FormGroup({
        houseNumber:new FormControl('',Validators.required),
        streetName:new FormControl('',Validators.required),
        colonyName:new FormControl('',Validators.required),
        city:new FormControl('',Validators.required),
        state:new FormControl('',Validators.required),
        pinCode:new FormControl('',Validators.required)
      });

  }

  onPostRegistration(){

    this.address={
      houseNumber:this.addressForm.value.houseNumber,
      streetName:this.addressForm.value.streetName,
      colonyName:this.addressForm.value.colonyName,
      city:this.addressForm.value.city,
      state:this.addressForm.value.state,
      pinCode:this.addressForm.value.pinCode
    }

    this.user={
      fullName:this.registrationForm.value.fullName,
      userName:this.registrationForm.value.userName,
      plainTextPassword:this.registrationForm.value.password,
      password:this.registrationForm.value.password,
      mobileNo:this.registrationForm.value.mobileNo,
      email:this.registrationForm.value.email,
      gender:this.registrationForm.value.gender,
      dateOfBirth:this.registrationForm.value.dateOfBirth,
      role:this.registrationForm.value.role,
      address:this.address
    }


    this.registrationService.postRegistration(this.user).subscribe(data=>{
      this.users.push(data);

    })
    alert("Registration successful!!")
  }



}
