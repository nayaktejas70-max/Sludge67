'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, Save } from 'lucide-react';

interface DietPlan {
  id: string;
  name: string;
  description: string;
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
  createdDate: string;
  journeyName: string;
}

export default function DietPlans({ user }: { user: any }) {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([
    {
      id: '1',
      name: 'Maintenance Plan',
      description: 'Balanced diet for weight maintenance',
      calorieGoal: 2200,
      proteinGoal: 165,
      carbsGoal: 220,
      fatGoal: 73,
      createdDate: '2024-01-01',
      journeyName: 'Healthy Lifestyle 2024',
    },
  ]);

  const [showNewPlan, setShowNewPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    calorieGoal: 2200,
    journeyName: '',
  });

  const addDietPlan = () => {
    if (!newPlan.name || !newPlan.journeyName) return;

    // Auto-calculate macros based on calorie goal
    const protein = newPlan.calorieGoal * 0.3 / 4; // 30% protein
    const carbs = newPlan.calorieGoal * 0.4 / 4; // 40% carbs
    const fat = newPlan.calorieGoal * 0.3 / 9; // 30% fat

    const plan: DietPlan = {
      id: Date.now().toString(),
      name: newPlan.name,
      description: newPlan.description,
      calorieGoal: newPlan.calorieGoal,
      proteinGoal: Math.round(protein),
      carbsGoal: Math.round(carbs),
      fatGoal: Math.round(fat),
      createdDate: new Date().toISOString().split('T')[0],
      journeyName: newPlan.journeyName,
    };

    setDietPlans([...dietPlans, plan]);
    setNewPlan({ name: '', description: '', calorieGoal: 2200, journeyName: '' });
    setShowNewPlan(false);
  };

  const deletePlan = (id: string) => {
    setDietPlans(dietPlans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Diet Plans</h2>
        <button
          onClick={() => setShowNewPlan(!showNewPlan)}
          className="flex items-center gap-2 px-4 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Plan
        </button>
      </div>

      {/* Create New Plan Form */}
      {showNewPlan && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Diet Plan</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
              <input
                type="text"
                placeholder="e.g., Weight Loss Plan"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Describe your diet plan goals"
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Calorie Goal</label>
                <input
                  type="number"
                  value={newPlan.calorieGoal}
                  onChange={(e) => setNewPlan({ ...newPlan, calorieGoal: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Journey Name</label>
                <input
                  type="text"
                  placeholder="e.g., Summer Body 2024"
                  value={newPlan.journeyName}
                  onChange={(e) => setNewPlan({ ...newPlan, journeyName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-aqua-50 border border-aqua-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">Auto-calculated Macros (30/40/30 split):</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Protein</p>
                  <p className="font-bold text-gray-900">{Math.round(newPlan.calorieGoal * 0.3 / 4)}g</p>
                </div>
                <div>
                  <p className="text-gray-600">Carbs</p>
                  <p className="font-bold text-gray-900">{Math.round(newPlan.calorieGoal * 0.4 / 4)}g</p>
                </div>
                <div>
                  <p className="text-gray-600">Fat</p>
                  <p className="font-bold text-gray-900">{Math.round(newPlan.calorieGoal * 0.3 / 9)}g</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addDietPlan}
                className="flex-1 px-4 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Plan
              </button>
              <button
                onClick={() => setShowNewPlan(false)}
                className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diet Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dietPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.journeyName}</p>
              </div>
              <button
                onClick={() => deletePlan(plan.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">{plan.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-aqua-50 rounded-lg">
              <div>
                <p className="text-gray-600 text-sm">Calories</p>
                <p className="text-2xl font-bold text-aqua-600">{plan.calorieGoal}</p>
                <p className="text-xs text-gray-500">Daily goal</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Protein</p>
                <p className="text-2xl font-bold text-aqua-600">{plan.proteinGoal}g</p>
                <p className="text-xs text-gray-500">30% of intake</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Carbs</p>
                <p className="text-2xl font-bold text-aqua-600">{plan.carbsGoal}g</p>
                <p className="text-xs text-gray-500">40% of intake</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Fat</p>
                <p className="text-2xl font-bold text-aqua-600">{plan.fatGoal}g</p>
                <p className="text-xs text-gray-500">30% of intake</p>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Created: {plan.createdDate}
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Plans */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Plans</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-900">Weight Loss</p>
            <p className="text-sm text-gray-600 mt-1">Deficit of 500 cal/day = ~0.5kg/week loss</p>
            <p className="text-sm font-medium text-aqua-600 mt-2">Daily: 1700 cal • 128g protein • 170g carbs • 57g fat</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-900">Maintenance</p>
            <p className="text-sm text-gray-600 mt-1">Perfect balance to maintain current weight</p>
            <p className="text-sm font-medium text-aqua-600 mt-2">Daily: 2200 cal • 165g protein • 220g carbs • 73g fat</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-medium text-gray-900">Muscle Gain</p>
            <p className="text-sm text-gray-600 mt-1">Surplus of 300 cal/day for lean gains</p>
            <p className="text-sm font-medium text-aqua-600 mt-2">Daily: 2500 cal • 188g protein • 250g carbs • 83g fat</p>
          </div>
        </div>
      </div>
    </div>
  );
}
