// Interface for detailed monster data from Open5e API
export interface Open5eMonster {
    name: string;
    type: string;
    hit_points: number;
    armor_class: number;
    alignment: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    desc: string;
    actions: Action[];
  }
  
  export interface Action {
    name: string;
    desc: string;
  }
  