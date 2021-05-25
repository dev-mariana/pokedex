import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  url = environment.baseUrl + 'pokemon/';
  _pokemons: any = [];
  _next: string = '';

  constructor(private http: HttpClient) { }

  get pokemons(): any[] {
    return this._pokemons;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  //obj de pokemon
  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  getPokemons(): Observable<any> {
    return this.http.get<any[]>(this.url);
  }

  getPokemonByName(name: string): Observable<any[]> {
    const url = `${this.url}${name}`;
    return this.http.get<any[]>(url);
  }

  getNext(): Observable<any[]> {
    const url = this._next === '' ? `${this.url}?limit=50` : this._next;
    return this.http.get<any[]>(url);
  }

  getEvolution(id: number): Observable<any[]> {
    const url = `${environment.baseUrl}evolution-chain/${id}`;
    return this.http.get<any[]>(url);
  }

  getSpecies(name: string): Observable<any[]> {
    const url = `${environment.baseUrl}pokemon-species/${name}`;
    return this.http.get<any[]>(url);
  }

}