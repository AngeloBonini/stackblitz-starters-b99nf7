import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Open5eMonster } from '../models/monster.interface';
@Injectable({
  providedIn: 'root',
})
export class LotrService {
  private LOTR_API_KEY = 'Sdac99Py55hhCYjGbSAe'; // Replace with your LOTR API key

  constructor(private http: HttpClient) {}

  getOpen5eMonsters(): Observable<{ results: Open5eMonster[] }> {
    return this.http.get<{ results: Open5eMonster[] }>('https://api.open5e.com/monsters/').pipe(
      map((response) => response),
      catchError((error) => {
        throw new Error('Error fetching monster data: ' + error.message);
      })
    );
  }

  // Method to merge data for a specific monster from both APIs

  
}
