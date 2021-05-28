import { Component, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pokemonsList: any[] = [];
  subscriptions: Subscription[] = [];
  loading = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    // this.getPokemons();
    this.loadMore();
  }

  get pokemons() {
    return this.pokemonService.pokemons;
  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  getPokemons() {
    this.pokemonService.getPokemons().subscribe(pokemons => {
      this.pokemonsList = pokemons.results;
      console.log(pokemons);
    });
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

  loadMore() {
    this.loading = true;
    this.subscription = this.pokemonService.getNext().subscribe((response: any) => {
      this.pokemonService.next = response.next;
      const details = response.results.map((p: any) => this.pokemonService.getPokemonByName(p.name));
      this.subscription = concat(...details).subscribe(response => {
        this.pokemonService.pokemons.push(response);
      });
    }, (err)=> {
      console.log('error', err);
    }, () => {
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

}