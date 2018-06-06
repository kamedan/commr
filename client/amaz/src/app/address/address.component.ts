import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  btnDisabled = false;
  currentAddress:any;

  constructor(private data : DataService, private rest : RestApiService) { }

  async ngOnInit() {
    try{
        const data = await this.rest.get('http://localhost:3000/api/accounts/address');
      

      if(JSON.stringify(data['address']) === '{}' && this.data.message === ''){
        this.data.warning('You didn\'t entered your shipping address');

      }

      this.currentAddress = data['address'];

    }catch(error){
      this.data.error(error['message']);
    }
  }


  async updateAdress(){
    this.btnDisabled = true;
    try{

        const data = await this.rest.post('http://localhost:3000/api/accounts/address', this.currentAddress);

        if(data['success']){
          this.data.success(data['message']);
          await this.data.getProfile();
        }else{
          this.data.error(data['message']);
        }

    }catch(error){
      this.data.error(error['message']);
      
    }

    this.btnDisabled = false;

  }

}
