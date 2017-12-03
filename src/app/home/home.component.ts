import { AuthenticationServiceService } from './../authentication-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autservice?: AuthenticationServiceService) {

   }

  ngOnInit() {
  }
  
  logout():void{
     this.autservice.logout();
     console.log('you are logged out');
  }

}
