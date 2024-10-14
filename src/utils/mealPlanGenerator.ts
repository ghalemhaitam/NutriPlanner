import { UserData, Meal, Ingredient } from '../types';

const defaultIngredients: Ingredient[] = [
  { name: 'Blanc de poulet', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Œufs', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Riz brun', calories: 216, protein: 4.5, carbs: 45, fat: 1.6 },
  { name: 'Brocoli', calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6 },
  { name: 'Patate douce', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
];

const calculateIngredientAmount = (ingredient: Ingredient, targetCalories: number): { amount: number; calories: number } => {
  const amount = Math.round((targetCalories / ingredient.calories) * 100);
  const calories = Math.round((amount / 100) * ingredient.calories);
  return { amount, calories };
};

export const generateMealPlan = (userData: UserData): Meal[] => {
  const { targetCalories, mealsPerDay } = userData;
  const mealPlan: Meal[] = [];

  const breakfastCalories = Math.round(targetCalories * 0.25);
  const lunchCalories = Math.round(targetCalories * 0.35);
  const dinnerCalories = Math.round(targetCalories * 0.35);
  const snackCalories = mealsPerDay === 4 ? Math.round(targetCalories * 0.05) : 0;

  // Breakfast
  const breakfast: Meal = {
    name: 'Petit-déjeuner',
    ingredients: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  };

  const eggs = defaultIngredients.find(ing => ing.name === 'Œufs')!;
  const { amount: eggAmount, calories: eggCalories } = calculateIngredientAmount(eggs, breakfastCalories * 0.6);
  breakfast.ingredients.push({
    ...eggs,
    name: `Œufs (${eggAmount}g)`,
    calories: eggCalories,
    protein: Math.round((eggAmount / 100) * eggs.protein),
    carbs: Math.round((eggAmount / 100) * eggs.carbs),
    fat: Math.round((eggAmount / 100) * eggs.fat),
  });

  breakfast.ingredients.push({
    name: 'Pain complet (30g)',
    calories: 75,
    protein: 3,
    carbs: 13,
    fat: 1,
  });

  breakfast.ingredients.push({
    name: 'Avocat (50g)',
    calories: 80,
    protein: 1,
    carbs: 4,
    fat: 7,
  });

  breakfast.totalCalories = breakfast.ingredients.reduce((sum, ing) => sum + ing.calories, 0);
  breakfast.totalProtein = breakfast.ingredients.reduce((sum, ing) => sum + ing.protein, 0);
  breakfast.totalCarbs = breakfast.ingredients.reduce((sum, ing) => sum + ing.carbs, 0);
  breakfast.totalFat = breakfast.ingredients.reduce((sum, ing) => sum + ing.fat, 0);
  mealPlan.push(breakfast);

  // Lunch
  const lunch: Meal = {
    name: 'Déjeuner',
    ingredients: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  };

  const chicken = defaultIngredients.find(ing => ing.name === 'Blanc de poulet')!;
  const { amount: chickenAmount, calories: chickenCalories } = calculateIngredientAmount(chicken, lunchCalories * 0.4);
  lunch.ingredients.push({
    ...chicken,
    name: `Blanc de poulet (${chickenAmount}g)`,
    calories: chickenCalories,
    protein: Math.round((chickenAmount / 100) * chicken.protein),
    carbs: Math.round((chickenAmount / 100) * chicken.carbs),
    fat: Math.round((chickenAmount / 100) * chicken.fat),
  });

  const rice = defaultIngredients.find(ing => ing.name === 'Riz brun')!;
  const { amount: riceAmount, calories: riceCalories } = calculateIngredientAmount(rice, lunchCalories * 0.3);
  lunch.ingredients.push({
    ...rice,
    name: `Riz brun (${riceAmount}g)`,
    calories: riceCalories,
    protein: Math.round((riceAmount / 100) * rice.protein),
    carbs: Math.round((riceAmount / 100) * rice.carbs),
    fat: Math.round((riceAmount / 100) * rice.fat),
  });

  const broccoli = defaultIngredients.find(ing => ing.name === 'Brocoli')!;
  const { amount: broccoliAmount, calories: broccoliCalories } = calculateIngredientAmount(broccoli, lunchCalories * 0.2);
  lunch.ingredients.push({
    ...broccoli,
    name: `Brocoli (${broccoliAmount}g)`,
    calories: broccoliCalories,
    protein: Math.round((broccoliAmount / 100) * broccoli.protein),
    carbs: Math.round((broccoliAmount / 100) * broccoli.carbs),
    fat: Math.round((broccoliAmount / 100) * broccoli.fat),
  });

  lunch.totalCalories = lunch.ingredients.reduce((sum, ing) => sum + ing.calories, 0);
  lunch.totalProtein = lunch.ingredients.reduce((sum, ing) => sum + ing.protein, 0);
  lunch.totalCarbs = lunch.ingredients.reduce((sum, ing) => sum + ing.carbs, 0);
  lunch.totalFat = lunch.ingredients.reduce((sum, ing) => sum + ing.fat, 0);
  mealPlan.push(lunch);

  // Dinner
  const dinner: Meal = {
    name: 'Dîner',
    ingredients: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  };

  const { amount: dinnerChickenAmount, calories: dinnerChickenCalories } = calculateIngredientAmount(chicken, dinnerCalories * 0.4);
  dinner.ingredients.push({
    ...chicken,
    name: `Blanc de poulet (${dinnerChickenAmount}g)`,
    calories: dinnerChickenCalories,
    protein: Math.round((dinnerChickenAmount / 100) * chicken.protein),
    carbs: Math.round((dinnerChickenAmount / 100) * chicken.carbs),
    fat: Math.round((dinnerChickenAmount / 100) * chicken.fat),
  });

  const sweetPotato = defaultIngredients.find(ing => ing.name === 'Patate douce')!;
  const { amount: sweetPotatoAmount, calories: sweetPotatoCalories } = calculateIngredientAmount(sweetPotato, dinnerCalories * 0.3);
  dinner.ingredients.push({
    ...sweetPotato,
    name: `Patate douce (${sweetPotatoAmount}g)`,
    calories: sweetPotatoCalories,
    protein: Math.round((sweetPotatoAmount / 100) * sweetPotato.protein),
    carbs: Math.round((sweetPotatoAmount / 100) * sweetPotato.carbs),
    fat: Math.round((sweetPotatoAmount / 100) * sweetPotato.fat),
  });

  dinner.ingredients.push({
    name: 'Salade mixte (100g)',
    calories: 20,
    protein: 1,
    carbs: 4,
    fat: 0,
  });

  dinner.totalCalories = dinner.ingredients.reduce((sum, ing) => sum + ing.calories, 0);
  dinner.totalProtein = dinner.ingredients.reduce((sum, ing) => sum + ing.protein, 0);
  dinner.totalCarbs = dinner.ingredients.reduce((sum, ing) => sum + ing.carbs, 0);
  dinner.totalFat = dinner.ingredients.reduce((sum, ing) => sum + ing.fat, 0);
  mealPlan.push(dinner);

  if (mealsPerDay === 4) {
    const snack: Meal = {
      name: 'Collation',
      ingredients: [
        { name: 'Yaourt grec (150g)', calories: 150, protein: 15, carbs: 5, fat: 8 },
        { name: 'Fruits rouges (100g)', calories: 50, protein: 1, carbs: 12, fat: 0 },
      ],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    };
    snack.totalCalories = snack.ingredients.reduce((sum, ing) => sum + ing.calories, 0);
    snack.totalProtein = snack.ingredients.reduce((sum, ing) => sum + ing.protein, 0);
    snack.totalCarbs = snack.ingredients.reduce((sum, ing) => sum + ing.carbs, 0);
    snack.totalFat = snack.ingredients.reduce((sum, ing) => sum + ing.fat, 0);
    mealPlan.push(snack);
  }

  return mealPlan;
};