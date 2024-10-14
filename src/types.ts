export interface UserData {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  targetCalories: number;
  mealsPerDay: 3 | 4;
}

export interface Ingredient {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  name: string;
  ingredients: Ingredient[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}