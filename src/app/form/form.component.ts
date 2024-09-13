import { Component, WritableSignal, Signal } from '@angular/core';
import { LotrService } from '../services/lotr.service'; // Import the service
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Open5eMonster } from '../models/monster.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  data: WritableSignal<any> = signal(null);
  error: WritableSignal<string | null> = signal(null);
  groupedMonsters: WritableSignal<{ [key: string]: Open5eMonster[] }> = signal({});
  expandedCards: Set<string> = new Set(); // Track which cards are expanded

  constructor(private apiService: LotrService) {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getOpen5eMonsters().subscribe({
      next: (monstersData) => {
        this.groupMonstersByName(monstersData.results);
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });
  }

  groupMonstersByName(monsters: Open5eMonster[]) {
    const grouped = monsters.reduce((acc, monster) => {
      const firstLetter = monster.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(monster);
      return acc;
    }, {} as { [key: string]: Open5eMonster[] });

    this.groupedMonsters.set(grouped);
  }

  getGroupedMonstersKeys(): string[] {
    return Object.keys(this.groupedMonsters()).sort();
  }

  toggleCard(index: string) {
    if (this.expandedCards.has(index)) {
      this.expandedCards.delete(index); // Collapse card
    } else {
      this.expandedCards.add(index); // Expand card
    }
  }

  isExpanded(index: string): boolean {
    return this.expandedCards.has(index);
  }

}
