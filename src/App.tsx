import React, { useState } from 'react';
import { UserForm } from './components/UserForm';
import { MealPlan } from './components/MealPlan';
import { IngredientList } from './components/IngredientList';
import { UserData, Meal } from './types';
import { generateMealPlan } from './utils/mealPlanGenerator';
import { Utensils } from 'lucide-react';

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mealPlan, setMealPlan] = useState<Meal[] | null>(null);

  const handleUserDataSubmit = (data: UserData) => {
    setUserData(data);
    const generatedMealPlan = generateMealPlan(data);
    setMealPlan(generatedMealPlan);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center">
          <Utensils className="mr-2" />
          NutriPlanner
        </h1>
        <p className="text-gray-600 mt-2">Votre compagnon ultime pour la planification des repas personnalisés</p>
      </header>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {!mealPlan ? (
              <UserForm onSubmit={handleUserDataSubmit} />
            ) : (
              <MealPlan mealPlan={mealPlan} />
            )}
          </div>
          <div>
            <IngredientList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;