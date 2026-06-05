'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Flame, Zap, Activity } from 'lucide-react';

export default function Dashboard({ user }: { user: any }) {
  const [todayStats, setTodayStats] = useState({
    calories: 1850,
    calorieGoal: 2200,
    workouts: 2,
    water: 6,
    steps: 8430,
  });

  const [weekData, setWeekData] = useState([
    { day: 'Mon', calories: 2100, burnt: 450 },
    { day: 'Tue', calories: 2000, burnt: 520 },
    { day: 'Wed', calories: 1800, burnt: 380 },
    { day: 'Thu', calories: 2200, burnt: 600 },
    { day: 'Fri', calories: 1900, burnt: 480 },
    { day: 'Sat', calories: 2300, burnt: 550 },
    { day: 'Sun', calories: 1850, burnt: 420 },
  ]);

  const calorieRemaining = todayStats.calorieGoal - todayStats.calories;
  const caloriePercentage = (todayStats.calories / todayStats.calorieGoal) * 100;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-aqua-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">Calories Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todayStats.calories}</p>
              <p className="text-sm text-gray-500 mt-1">Target: {todayStats.calorieGoal}</p>
            </div>
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-aqua-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {calorieRemaining > 0 ? `+${calorieRemaining}` : `${Math.abs(calorieRemaining)}`} remaining
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-aqua-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">Calories Burnt</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">450</p>
              <p className="text-sm text-gray-500 mt-1">From workouts</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-aqua-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">Workouts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todayStats.workouts}</p>
              <p className="text-sm text-gray-500 mt-1">Today</p>
            </div>
            <Activity className="w-8 h-8 text-aqua-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-aqua-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm font-medium">Water Intake</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todayStats.water}L</p>
              <p className="text-sm text-gray-500 mt-1">Goal: 8L</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Calories vs Burnt</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calories" fill="#00BCD4" name="Consumed" />
              <Bar dataKey="burnt" fill="#FF9800" name="Burnt" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="#00BCD4" name="Consumed" />
              <Line type="monotone" dataKey="burnt" stroke="#FF9800" name="Burnt" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Pushed 20 Pushups</p>
              <p className="text-sm text-gray-500">Burnt ~80 calories</p>
            </div>
            <p className="text-sm font-medium text-gray-600">2:30 PM</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Ate Chicken & Rice</p>
              <p className="text-sm text-gray-500">Added 450 calories</p>
            </div>
            <p className="text-sm font-medium text-gray-600">1:00 PM</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">30 Min Cardio</p>
              <p className="text-sm text-gray-500">Burnt ~320 calories</p>
            </div>
            <p className="text-sm font-medium text-gray-600">7:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
