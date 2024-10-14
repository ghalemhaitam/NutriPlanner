import React, { useState } from 'react';
import { Ingredient } from '../types';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

const defaultIngredients: Ingredient[] = [
  { name: 'Blanc de poulet', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Œufs', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Riz brun', calories: 216, protein: 4.5, carbs: 45, fat: 1.6 },
  { name: 'Brocoli', calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6 },
  { name: 'Patate douce', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
];

export const IngredientList: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(defaultIngredients);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddIngredient = () => {
    if (newIngredient.name) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
    }
  };

  const handleDeleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleEditIngredient = (index: number) => {
    setEditingIndex(index);
    setNewIngredient(ingredients[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedIngredients = [...ingredients];
      updatedIngredients[editingIndex] = newIngredient;
      setIngredients(updatedIngredients);
      setEditingIndex(null);
      setNewIngredient({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewIngredient({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewIngredient({ ...newIngredient, [name]: name === 'name' ? value : Number(value) });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Liste d'Ingrédients</h2>
      <ul className="mb-4">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="mb-2 p-2 bg-gray-100 rounded flex justify-between items-center">
            <span>
              <strong>{ingredient.name}</strong> - {ingredient.calories} kcal
            </span>
            <div>
              <button
                onClick={() => handleEditIngredient(index)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDeleteIngredient(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          type="text"
          name="name"
          placeholder="Nom de l'ingrédient"
          value={newIngredient.name}
          onChange={handleInputChange}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          type="number"
          name="calories"
          placeholder="Calories"
          value={newIngredient.calories}
          onChange={handleInputChange}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          type="number"
          name="protein"
          placeholder="Protéines (g)"
          value={newIngredient.protein}
          onChange={handleInputChange}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          type="number"
          name="carbs"
          placeholder="Glucides (g)"
          value={newIngredient.carbs}
          onChange={handleInputChange}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          type="number"
          name="fat"
          placeholder="Lipides (g)"
          value={newIngredient.fat}
          onChange={handleInputChange}
        />
      </div>
      {editingIndex !== null ? (
        <div className="flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center mr-2"
            onClick={handleSaveEdit}
          >
            <Check className="mr-2" />
            Sauvegarder
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            onClick={handleCancelEdit}
          >
            <X className="mr-2" />
            Annuler
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          onClick={handleAddIngredient}
        >
          <Plus className="mr-2" />
          Ajouter un Ingrédient
        </button>
      )}
    </div>
  );
};