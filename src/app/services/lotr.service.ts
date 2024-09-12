import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LotrService {
  private LOTR_API_KEY = 'Sdac99Py55hhCYjGbSAe'; // Replace with your LOTR API key

  constructor(private http: HttpClient) {}

  // Method to get D&D monsters
  getDnDMonsters(): Observable<any> {
    return this.http.get('https://www.dnd5eapi.co/api/monsters');
  }

  // Method to get LOTR movies
  getLotrMovies(): Observable<any> {
    return this.http.get('https://the-one-api.dev/v2/movie', {
      headers: {
        Authorization: `Bearer ${this.LOTR_API_KEY}`,
      },
    });
  }

  // Method to combine data from both APIs
  getCombinedData(): Observable<any> {
    return combineLatest([this.getDnDMonsters(), this.getLotrMovies()]).pipe(
      map(([dndData, lotrData]) => ({
        dndMonsters: dndData.results,
        lotrMovies: lotrData.docs,
      })),
      catchError((error) => {
        throw new Error('Error fetching data: ' + error.message);
      })
    );
  }
  
}
