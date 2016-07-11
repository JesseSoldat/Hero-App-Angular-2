import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()

export class HeroService {

	private heroesUrl = 'app/heroes';

	constructor(private http: Http) {}


	private handleError(error: any) {
		console.log('An error, occurred', error);
		return Promise.reject(error.message || error);
	}


	//Get Heroes

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
			.toPromise()
			.then( response => response.json().data )
			.catch(this.handleError);
			
	}

	// getHeroes() {
	// 	return Promise.resolve(HEROES);
	// }
	//Get Hero
	getHero(id: number){
		return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
	}

	
	  save(hero: Hero): Promise<Hero> {
		if (hero.id) {
			return this.put(hero);
		}  else {
		return this.post(hero);
	}


	//Create a Hero POST
	private post(hero: Hero): Promise<Hero> {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http
			.post(this.heroesUrl,
			JSON.stringify(hero),
			{headers: headers}
			)
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	//Update a Hero PUT
	private put(hero: Hero) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let url = `${this.heroesUrl}/${hero.id}`;

		return this.http
			.put(url, JSON.stringify(hero), {headers: headers})
			.toPromise()
			.then( () => hero)
			.catch(this.handleError);
	}
	//Delete a Hero 
	delete(hero: Hero) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.heroesUrl}/${hero.id}`;

		return this.http
			.delete(url, headers)
			.toPromise()
			.catch(this.handleError);
	}

	
} 