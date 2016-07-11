import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()

export class HeroService {
	private heroesUrl = 'app/heroes';


	constructor(private http: Http) {}

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
			.toPromise()
			.then( res => res.json().data )
			.catch( this.handleError );
	}

	// getHeroes() {
	// 	return Promise.resolve(HEROES);
	// }
	getHero(id: number){
		return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
	}
} 