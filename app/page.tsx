'use client';

import { useState, useEffect } from 'react';
import {
  Activity,
  Utensils,
  Dumbbell,
  TrendingUp,
  BookOpen,
  BarChart3,
  Plus,
  Home as HomeIcon,
} from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import CalorieTracker from '@/components/CalorieTracker';
import WorkoutTracker from '@/components/WorkoutTracker';
import Trainer from '@/components/Trainer';
import WeightTracking from '@/components/WeightTracking';
import DietPlans from '@/components/DietPlans';
import BMIAnalysis from '@/components/BMIAnalysis';

type Section = 'dashboard' | 'calories' | 'workout' | 'trainer' | 'weight' | 'diet' | 'bmi';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Initialize user data from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Create demo user
      const demoUser = {
        id: '1',
        name: 'Fitness Enthusiast',
        age: 28,
        weight: 75,
        height: 175,
        gender: 'male',
      };
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
    }
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'calories':
        return <CalorieTracker user={user} />;
      case 'workout':
        return <WorkoutTracker user={user} />;
      case 'trainer':
        return <Trainer user={user} />;
      case 'weight':
        return <WeightTracking user={user} />;
      case 'diet':
        return <DietPlans user={user} />;
      case 'bmi':
        return <BMIAnalysis user={user} setUser={setUser} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-aqua-400 to-aqua-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Sludge67</h1>
            </div>
            {user && (
              <div className="text-right">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.weight}kg • {user.height}cm • {user.age}yo</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
          <nav className="p-6 space-y-2">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'dashboard'
                  ? 'bg-aqua-100 text-aqua-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveSection('calories')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'calories'
                  ? 'bg-aqua-100 text-aqua-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Utensils className="w-5 h-5" />
              Calorie Tracker
            </button>

            <button
              onClick={() => setActiveSection('workout')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'workout'
                  ? 'bg-aqua-100 text-aqua-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity className="w-5 h-5" />
              Workout Tracker
            </button>

            <button
              onClick={() => setActiveSection('trainer')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'trainer'
                  ? 'bg-aqua-100 text-aqua-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Trainer
            </button>

            <button
              onClick={() => setActiveSection('weight')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'weight'
                  ? 'bg-aqua-100 text-aqua-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Weight Tracking
            </button>

            <button
              onClick={() => setActiveSection('diet')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'diet'
                  ? 'bg-aqua-100 text-aqua-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Utensils className="w-5 h-5" />
              Diet Plans
            </button>

            <button
              onClick={() => setActiveSection('bmi')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'bmi'
                  ? 'bg-aqua-100 text-aqua-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              BMI Analysis
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-8">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
