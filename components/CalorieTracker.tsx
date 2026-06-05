'use client';

import { useState } from 'react';
import { Plus, Camera, Search, Trash2 } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  unit: string;
}

export default function CalorieTracker({ user }: { user: any }) {
  const [meals, setMeals] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      quantity: 100,
      unit: 'g',
    },
  ]);

  const [newMeal, setNewMeal] = useState('');
  const [foodDatabase, setFoodDatabase] = useState([
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Rice (cooked)', calories: 206, protein: 4.3, carbs: 45, fat: 0.3 },
    { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { name: 'Salmon', calories: 280, protein: 25, carbs: 0, fat: 17 },
    { name: 'Oats', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  ]);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoods = foodDatabase.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addMeal = (food: any) => {
    const newItem: FoodItem = {
      id: Date.now().toString(),
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      quantity: 100,
      unit: 'g',
    };
    setMeals([...meals, newItem]);
    setSearchQuery('');
    setShowSearch(false);
  };

  const removeMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const updateMealQuantity = (id: string, quantity: number) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id ? { ...meal, quantity } : meal
      )
    );
  };

  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories * meal.quantity) / 100, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein * meal.quantity) / 100, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs * meal.quantity) / 100, 0);
  const totalFat = meals.reduce((sum, meal) => sum + (meal.fat * meal.quantity) / 100, 0);

  const calorieGoal = 2200;
  const remaining = calorieGoal - totalCalories;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Calorie Tracker</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 transition-colors">
            <Camera className="w-5 h-5" />
            Photo Track
          </button>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center gap-2 px-4 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Food
          </button>
        </div>
      </div>

      {/* Calorie Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Consumed</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{Math.round(totalCalories)}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Goal</p>
            <p className="text-3xl font-bold text-aqua-500 mt-2">{calorieGoal}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Remaining</p>
            <p className={`text-3xl font-bold mt-2 ${remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Math.round(remaining)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium">Progress</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{Math.round((totalCalories / calorieGoal) * 100)}%</p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-aqua-400 to-aqua-600 h-3 rounded-full transition-all"
            style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div>
            <p className="text-gray-600 text-sm">Protein</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(totalProtein)}g</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Carbs</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(totalCarbs)}g</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Fat</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(totalFat)}g</p>
          </div>
        </div>
      </div>

      {/* Food Search */}
      {showSearch && (
        <div className="bg-white rounded-lg shadow p-6">
          <input
            type="text"
            placeholder="Search foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
          />
          <div className="mt-4 space-y-2">
            {filteredFoods.slice(0, 8).map((food, idx) => (
              <button
                key={idx}
                onClick={() => addMeal(food)}
                className="w-full text-left p-3 bg-gray-50 hover:bg-aqua-50 rounded-lg transition-colors border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{food.name}</p>
                    <p className="text-sm text-gray-500">{food.calories} cal • P:{food.protein}g C:{food.carbs}g F:{food.fat}g</p>
                  </div>
                  <span className="text-aqua-500 font-semibold">+ Add</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Meals List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Foods</h3>
        <div className="space-y-3">
          {meals.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No meals logged yet</p>
          ) : (
            meals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{meal.name}</p>
                  <p className="text-sm text-gray-500">
                    {(meal.calories * meal.quantity) / 100} cal • P:{Math.round((meal.protein * meal.quantity) / 100)}g
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={meal.quantity}
                    onChange={(e) => updateMealQuantity(meal.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                  />
                  <span className="text-gray-600 text-sm">{meal.unit}</span>
                  <button
                    onClick={() => removeMeal(meal.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
