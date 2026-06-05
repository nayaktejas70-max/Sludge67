'use client';

import { useState } from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  healthRisk: string;
}

export default function BMIAnalysis({ user, setUser }: { user: any; setUser: (user: any) => void }) {
  const [height, setHeight] = useState(user?.height?.toString() || '175');
  const [weight, setWeight] = useState(user?.weight?.toString() || '75');
  const [age, setAge] = useState(user?.age?.toString() || '28');
  const [gender, setGender] = useState(user?.gender || 'male');
  const [waterIntake, setWaterIntake] = useState('8');
  const [exerciseFrequency, setExerciseFrequency] = useState('3');

  const calculateBMI = (): BMIResult => {
    const h = parseFloat(height) / 100; // convert to meters
    const w = parseFloat(weight);
    const bmi = w / (h * h);

    let category = '';
    let color = '';
    let healthRisk = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'blue';
      healthRisk = 'Low physical fitness, potential nutritional deficiencies';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = 'green';
      healthRisk = 'Optimal health status';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'orange';
      healthRisk = 'Increased risk of chronic diseases';
    } else {
      category = 'Obese';
      color = 'red';
      healthRisk = 'High risk of heart disease, diabetes, and other conditions';
    }

    return { bmi: parseFloat(bmi.toFixed(1)), category, color, healthRisk };
  };

  const bmiResult = calculateBMI();

  const calculateIdealWeightRange = () => {
    const h = parseFloat(height) / 100;
    const minWeight = (18.5 * h * h).toFixed(1);
    const maxWeight = (24.9 * h * h).toFixed(1);
    return { minWeight, maxWeight };
  };

  const idealWeight = calculateIdealWeightRange();
  const currentWeight = parseFloat(weight);
  const weightDifference = currentWeight - parseFloat(idealWeight.maxWeight);

  const updateUserProfile = () => {
    setUser({
      ...user,
      height: parseFloat(height),
      weight: parseFloat(weight),
      age: parseInt(age),
      gender,
    });
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200',
      red: 'text-red-600 bg-red-50 border-red-200',
    };
    return colors[color] || colors.blue;
  };

  const recommendations = [
    {
      title: 'Nutrition',
      items:
        bmiResult.bmi > 25
          ? [
              'Reduce calorie intake by 300-500 cal/day',
              'Increase protein consumption to preserve muscle',
              'Focus on whole foods and reduce processed items',
              'Stay hydrated: drink 8-10 glasses of water daily',
            ]
          : [
              'Maintain balanced macronutrient intake',
              'Eat plenty of whole grains and vegetables',
              'Stay consistent with healthy eating habits',
              'Stay hydrated: drink 8-10 glasses of water daily',
            ],
    },
    {
      title: 'Exercise',
      items:
        bmiResult.bmi > 25
          ? [
              '150+ minutes of cardio per week',
              '2-3 strength training sessions weekly',
              'Start with low-impact exercises if needed',
              'Gradually increase intensity as fitness improves',
            ]
          : [
              '150 minutes of moderate aerobic activity weekly',
              '2-3 strength training sessions for muscle maintenance',
              'Mix cardio and resistance training',
              'Include flexibility and balance exercises',
            ],
    },
    {
      title: 'Lifestyle',
      items: [
        `Get ${7 + Math.floor(bmiResult.bmi > 25 ? 1 : 0)}-9 hours of quality sleep`,
        'Manage stress through meditation or yoga',
        'Limit alcohol consumption',
        'Regular health check-ups annually',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">BMI Analysis & Health Assessment</h2>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Measurements</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <button
          onClick={updateUserProfile}
          className="flex items-center gap-2 px-4 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Profile
        </button>
      </div>

      {/* BMI Result */}
      <div className={`rounded-lg shadow p-8 border-l-4 ${getColorClasses(bmiResult.color)}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">YOUR BMI</p>
            <p className={`text-5xl font-bold ${getColorClasses(bmiResult.color).split(' ')[0]}`}>
              {bmiResult.bmi}
            </p>
            <p className={`text-xl font-semibold mt-2 ${getColorClasses(bmiResult.color).split(' ')[0]}`}>
              {bmiResult.category}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">IDEAL WEIGHT RANGE</p>
            <p className="text-3xl font-bold text-gray-900">
              {idealWeight.minWeight} - {idealWeight.maxWeight} kg
            </p>
            <p className="text-sm text-gray-600 mt-2">For height {height} cm</p>

            {weightDifference > 0 && (
              <p className={`text-sm font-medium mt-4 text-orange-600`}>
                {weightDifference.toFixed(1)} kg above ideal range
              </p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">HEALTH RISK</p>
            <div className="flex items-start gap-2">
              {bmiResult.bmi > 25 ? (
                <AlertCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
              )}
              <p className="text-sm leading-relaxed">{bmiResult.healthRisk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BMI Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">BMI Scale</h3>
        <div className="flex gap-2 h-12">
          <div className="flex-1 bg-blue-500 rounded-l-lg flex items-center justify-center text-white text-xs font-semibold">
            Underweight
            {bmiResult.bmi < 18.5 && <span className="ml-auto mr-2">●</span>}
          </div>
          <div className="flex-1 bg-green-500 flex items-center justify-center text-white text-xs font-semibold">
            Normal
            {bmiResult.bmi >= 18.5 && bmiResult.bmi < 25 && <span className="ml-auto mr-2">●</span>}
          </div>
          <div className="flex-1 bg-orange-500 flex items-center justify-center text-white text-xs font-semibold">
            Overweight
            {bmiResult.bmi >= 25 && bmiResult.bmi < 30 && <span className="ml-auto mr-2">●</span>}
          </div>
          <div className="flex-1 bg-red-500 rounded-r-lg flex items-center justify-center text-white text-xs font-semibold">
            Obese
            {bmiResult.bmi >= 30 && <span className="ml-auto mr-2">●</span>}
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600 flex justify-between">
          <span>&lt;18.5</span>
          <span>18.5-25</span>
          <span>25-30</span>
          <span>&gt;30</span>
        </div>
      </div>

      {/* Comprehensive Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((section, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-aqua-100 flex items-center justify-center text-aqua-600 text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Calorie & Nutrition Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Calorie & Nutrition Guidelines</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Daily Calorie Needs (TDEE)</h4>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Sedentary Lifestyle</p>
                <p className="text-lg font-bold text-gray-900">{Math.round(1700 + parseInt(weight) * 5)} cal</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Moderate Activity (3-5 days/week)</p>
                <p className="text-lg font-bold text-gray-900">{Math.round(1700 + parseInt(weight) * 7.5)} cal</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Very Active (6-7 days/week)</p>
                <p className="text-lg font-bold text-gray-900">{Math.round(1700 + parseInt(weight) * 10)} cal</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Macronutrient Targets (30/40/30 split)</h4>
            <div className="space-y-2">
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600">Protein (30%)</p>
                <p className="text-lg font-bold text-gray-900">
                  ~{Math.round((1700 + parseInt(weight) * 7.5) * 0.3 / 4)}g / day
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-600">Carbohydrates (40%)</p>
                <p className="text-lg font-bold text-gray-900">
                  ~{Math.round((1700 + parseInt(weight) * 7.5) * 0.4 / 4)}g / day
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-600">Fats (30%)</p>
                <p className="text-lg font-bold text-gray-900">
                  ~{Math.round((1700 + parseInt(weight) * 7.5) * 0.3 / 9)}g / day
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
