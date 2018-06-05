import { Component } from '@angular/core';

import {DataService} from './data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchterm = '';
  isCollapsed = true;

  constructor(private router :Router, private data : DataService){}


  getToken(){
    return localStorage.getItem('token');
  }

  collapse(){
    this.isCollapsed = true;
  }


  closeDropdown(dropdown){
    dropdown.close();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  search(){
    
  }

}
