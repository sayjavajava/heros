import { HeroService } from './../hero.service';
import { AuthenticationServiceService } from './../authentication-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    rForm :FormGroup;
    name:String;
    description :String;
    titlealert:'you must provide name between 4 and 20 char';
      saveSuccess :  boolean ;
  model: any = {};
  loading = false;
  error = '';
  

  constructor(
      private router: Router,
      private authenticationService: AuthenticationServiceService,
      private fb ?:FormBuilder,
      private heroservice?:HeroService 
    ) { 
        this.rForm =fb.group({
            'name': [null,Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(4)])],
            'description':[null,Validators.required]

        })
    }

    addPost(post) {
        this.description = post.description;
        this.name = post.name;
     if(post != null){
    // this.saveSuccess=true;
     }
     this.heroservice.findOne(this.name);
     
    
    //console.log('waqas'+post.name);
    }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(result => {
              if (result === true) {
                  // login successful
                  this.router.navigate(['home']);
              } else {
                  // login failed
                  this.error = 'Username or password is incorrect';
                  this.loading = false;
              }
          }, error => {
            this.loading = false;
            this.error = error;
          });
  }


}
