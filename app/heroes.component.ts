import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';

import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';


@Component({
  selector: 'my-heroes', 

  styleUrls:  ['app/heroes.component.css'],

  templateUrl: 'app/heroes.component.html',

  directives: [HeroDetailComponent]

})

export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  error: any;
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService
    ) { }

 
  getHeroes() {
  this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }


  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero;}

  gotoDetail(){
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

}





