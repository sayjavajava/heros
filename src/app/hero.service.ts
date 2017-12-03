import { AuthenticationServiceService } from './authentication-service.service';
import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import {Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Hero } from './hero'

@Injectable()
export class HeroService {

  constructor(private http: Http,private authenticationservice ?:AuthenticationServiceService) {
    }
  private heroesUrl = 'http://localhost:8080/heros';
  private findurl = 'http://localhost:8080/findByName/';
  //modurl:String;

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + this.authenticationservice.getToken()
    });
   
    getHeroes(): Promise<Hero[]> {
      return this.http
       .get(this.heroesUrl, {headers: this.headers})
       .toPromise()
       .then(response => response.json()._embedded.heroes as Hero[])
       .catch(this.handleError);
     }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error); // for demo only
    return Promise.reject(error.message || error);
  }

findAll(): Observable<Hero[]>  {

    return this.http.get(this.heroesUrl,{headers:this.headers})
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

findOne(name:String): Observable<Hero[]>  {
   console.log("hell"+this.findurl+name);     
          return this.http.get(this.findurl+name,{headers:this.headers})
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
          }
      
          
    
  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
     .then(heroes => heroes.find(hero => hero.id === id))
  }
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    console.log(`hero.service - deleting ${id}`);
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
