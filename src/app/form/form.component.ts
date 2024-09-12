import { Component, WritableSignal, Signal } from '@angular/core';
import { LotrService } from '../services/lotr.service'; // Import the service
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  groupedMonsters: WritableSignal<{ [key: string]: any[] }> = signal({});

  constructor(private apiService: LotrService) {
    this.fetchData();
  }

  // Fetch combined data using the service
  fetchData() {
    this.apiService.getCombinedData().subscribe({
      next: (combinedData) => {
        this.data.set(combinedData);
        this.groupMonstersByName(combinedData.dndMonsters);
      },
      error: (err) => {
        this.error.set(err.message);
      },
    });
  }

  groupMonstersByName(monsters: any[]) {
    const grouped = monsters.reduce((acc, monster) => {
      const firstLetter = monster.name[0].toUpperCase(); // Group by first letter
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(monster);
      return acc;
    }, {} as { [key: string]: any[] });

    this.groupedMonsters.set(grouped);
  }
  getGroupedMonstersKeys(): string[] {
    return Object.keys(this.groupedMonsters()).sort();
  }
}
