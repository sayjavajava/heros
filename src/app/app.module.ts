import { AuthenticationServiceService } from './authentication-service.service';
import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AppRoutingModule} from "./app-routing.module";




import { AppComponent }  from './app.component';
import { DashboardComponent } from "./dashboard.component";
import { HeroesComponent } from "./heroes.component";
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from "./hero.service";
import {HeroSearchComponent} from "./hero-search.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports:      [
  	BrowserModule,
	  FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
  	AppComponent,
    DashboardComponent,
	  HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [ HeroService,AuthenticationServiceService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
