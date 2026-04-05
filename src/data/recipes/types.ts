export interface Recipe {
  id: number;
  name: string;
  utensils: string[];
  ingredients: string[];
  stamina: number | null;
  fatigue: number | null;
  sellPrice: string;
  howToObtain: string;
}
