import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;

  btnDisabled = false;


  constructor(private router :Router, private data : DataService, private rest : RestApiService) { }

  ngOnInit() {}

  validate(){
    if(this.name){

      if(this.email){

        if(this.password){
          if(this.password1){

            if(this.password === this.password1){
              return true;
            }else{
              this.data.error('password do not match');
            }

          }else{
            this.data.error('confirmation password not entered');
          }

        }else{
          this.data.error('Password not entered');
        }

      }else{
        this.data.error('Email not entered');
      }

    }else{
      this.data.error('Name not entered');
    }


  }


  async register(){
    this.btnDisabled = true;
    try{
      if(this.validate()){
        const data = await this.rest.post('http://localhost:3000/api/accounts/signup', {
          name : this.name,
          email: this.email,
          password: this.password,
          isSeller: this.isSeller
        });
        if(data['success']){
          localStorage.setItem('token', data['token']);
          

          await this.data.getProfile();
          this.router.navigate(['profile/address']).then(()=>{
            this.data.success('Registration Successful ! Please enter your shipping address');
          }).catch(error => this.data.error(error));
        }else{
          this.data.error(data['message']);
        }
      }

    }catch(error){
      this.data.error(error['message']);
      
    }

    this.btnDisabled = false;
  }

}
