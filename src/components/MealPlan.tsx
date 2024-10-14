import React from 'react';
import { Meal } from '../types';
import { Egg, Drumstick, Salad } from 'lucide-react';

interface MealPlanProps {
  mealPlan: Meal[];
}

export const MealPlan: React.FC<MealPlanProps> = ({ mealPlan }) => {
  const getMealIcon = (mealName: string) => {
    switch (mealName.toLowerCase()) {
      case 'petit-déjeuner':
        return <Egg className="w-6 h-6 mr-2" />;
      case 'déjeuner':
      case 'dîner':
        return <Drumstick className="w-6 h-6 mr-2" />;
      default:
        return <Salad className="w-6 h-6 mr-2" />;
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Votre Plan de Repas</h2>
      {mealPlan.map((meal, index) => (
        <div key={index} className="mb-6 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            {getMealIcon(meal.name)}
            {meal.name}
          </h3>
          <ul className="list-disc list-inside">
            {meal.ingredients.map((ingredient, idx) => (
              <li key={idx}>
                {ingredient.name} - {ingredient.calories} kcal
              </li>
            ))}
          </ul>
          <div className="mt-2 text-sm text-gray-600">
            <p>Total Calories: {meal.totalCalories} kcal</p>
            <p>Protéines: {meal.totalProtein}g | Glucides: {meal.totalCarbs}g | Lipides: {meal.totalFat}g</p>
          </div>
        </div>
      ))}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {/* Implement export to Excel functionality */}}
      >
        Exporter vers Excel
      </button>
    </div>
  );
};