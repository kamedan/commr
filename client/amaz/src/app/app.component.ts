import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchterm = '';
  isCollapsed = true;


  getToken(){
    return localStorage.getItem('token');
  }

  collapse(){
    this.isCollapsed = true;
  }


  closeDropdown(dropdown){
    dropdown.close();
  }

  logout(){}

  search(){
    
  }

}
