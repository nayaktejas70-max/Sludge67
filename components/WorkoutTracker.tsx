'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Play } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  target: string;
  equipment: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  caloriesBurnt: number;
}

interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  totalCalories: number;
  duration: number;
}

export default function WorkoutTracker({ user }: { user: any }) {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Upper Body Strength',
      date: new Date().toISOString().split('T')[0],
      exercises: [
        {
          id: '1',
          name: 'Pushups',
          target: 'chest',
          equipment: 'bodyweight',
          sets: 3,
          reps: 20,
          caloriesBurnt: 80,
        },
      ],
      totalCalories: 80,
      duration: 20,
    },
  ]);

  const [exerciseDatabase] = useState([
    { name: 'Pushups', target: 'chest', equipment: 'bodyweight', image: '💪' },
    { name: 'Squats', target: 'legs', equipment: 'bodyweight', image: '🦵' },
    { name: 'Pull-ups', target: 'back', equipment: 'bar', image: '💪' },
    { name: 'Bench Press', target: 'chest', equipment: 'barbell', image: '🏋️' },
    { name: 'Deadlift', target: 'back', equipment: 'barbell', image: '🏋️' },
    { name: 'Running', target: 'cardio', equipment: 'none', image: '🏃' },
    { name: 'Cycling', target: 'cardio', equipment: 'bike', image: '🚴' },
    { name: 'Dumbbell Curls', target: 'arms', equipment: 'dumbbell', image: '💪' },
  ]);

  const [showNewWorkout, setShowNewWorkout] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [selectedExerciseType, setSelectedExerciseType] = useState('');

  const calculateCaloriesBurnt = (exercise: Exercise) => {
    let calories = 0;

    // Rough calorie estimation based on exercise type and intensity
    const bodyweight = user?.weight || 75;
    const metsValues: { [key: string]: number } = {
      pushups: 3.8,
      squats: 5,
      'pull-ups': 8,
      'bench press': 6,
      deadlift: 6.5,
      running: 9.8,
      cycling: 7,
      'dumbbell curls': 3,
    };

    const mets = metsValues[exercise.name.toLowerCase()] || 3.5;
    const durationMinutes = exercise.sets * (exercise.reps * 0.5 + 1);

    // Calorie formula: METs × weight(kg) × time(hours)
    calories = Math.round(mets * bodyweight * (durationMinutes / 60));

    return Math.max(calories, 20);
  };

  const addExerciseToWorkout = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      target: 'compound',
      equipment: 'mixed',
      sets: 3,
      reps: 10,
      caloriesBurnt: 50,
    };
    const caloriesBurnt = calculateCaloriesBurnt(newExercise);
    newExercise.caloriesBurnt = caloriesBurnt;
    setSelectedExercises([...selectedExercises, newExercise]);
  };

  const removeExercise = (id: string) => {
    setSelectedExercises(selectedExercises.filter((ex) => ex.id !== id));
  };

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    setSelectedExercises(
      selectedExercises.map((ex) => {
        if (ex.id === id) {
          const updated = { ...ex, ...updates };
          updated.caloriesBurnt = calculateCaloriesBurnt(updated);
          return updated;
        }
        return ex;
      })
    );
  };

  const saveWorkout = () => {
    if (!newWorkoutName || selectedExercises.length === 0) return;

    const totalCalories = selectedExercises.reduce((sum, ex) => sum + ex.caloriesBurnt, 0);
    const totalDuration = selectedExercises.reduce((sum, ex) => sum + ex.sets * (ex.reps * 0.5 + 1), 0);

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: newWorkoutName,
      date: new Date().toISOString().split('T')[0],
      exercises: selectedExercises,
      totalCalories,
      duration: Math.round(totalDuration),
    };

    setWorkouts([newWorkout, ...workouts]);
    setNewWorkoutName('');
    setSelectedExercises([]);
    setShowNewWorkout(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Workout Tracker</h2>
        <button
          onClick={() => setShowNewWorkout(!showNewWorkout)}
          className="flex items-center gap-2 px-4 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Workout
        </button>
      </div>

      {/* New Workout Form */}
      {showNewWorkout && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Workout</h3>

          <input
            type="text"
            placeholder="Workout name (e.g., Upper Body Strength)"
            value={newWorkoutName}
            onChange={(e) => setNewWorkoutName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent mb-4"
          />

          <div className="mb-4">
            <p className="font-medium text-gray-900 mb-2">Add Exercises</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {exerciseDatabase.map((ex) => (
                <button
                  key={ex.name}
                  onClick={() => addExerciseToWorkout(ex.name)}
                  className="p-3 bg-gray-50 hover:bg-aqua-50 border border-gray-200 rounded-lg transition-colors text-center"
                >
                  <span className="text-2xl block mb-1">{ex.image}</span>
                  <p className="text-sm font-medium text-gray-900">{ex.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Exercises */}
          {selectedExercises.length > 0 && (
            <div className="space-y-3 mb-4">
              <p className="font-medium text-gray-900">Selected Exercises</p>
              {selectedExercises.map((ex) => (
                <div key={ex.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{ex.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        value={ex.sets}
                        onChange={(e) => updateExercise(ex.id, { sets: parseInt(e.target.value) })}
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                      <span className="text-gray-600">sets</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        value={ex.reps}
                        onChange={(e) => updateExercise(ex.id, { reps: parseInt(e.target.value) })}
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center"
                      />
                      <span className="text-gray-600">reps</span>
                    </div>
                    <span className="text-aqua-600 font-semibold">{ex.caloriesBurnt} cal</span>
                    <button
                      onClick={() => removeExercise(ex.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={saveWorkout}
              disabled={!newWorkoutName || selectedExercises.length === 0}
              className="flex-1 px-4 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save Workout
            </button>
            <button
              onClick={() => {
                setShowNewWorkout(false);
                setNewWorkoutName('');
                setSelectedExercises([]);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Workouts List */}
      <div className="space-y-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                <p className="text-sm text-gray-500">{workout.date}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-aqua-500">{workout.totalCalories}</p>
                <p className="text-sm text-gray-500">calories burned</p>
              </div>
            </div>

            <div className="space-y-2">
              {workout.exercises.map((ex) => (
                <div key={ex.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{ex.name}</p>
                    <p className="text-sm text-gray-500">
                      {ex.sets} × {ex.reps} • {ex.caloriesBurnt} cal
                    </p>
                  </div>
                  <button className="flex items-center gap-1 px-3 py-1 bg-aqua-100 text-aqua-700 rounded hover:bg-aqua-200 transition-colors">
                    <Play className="w-4 h-4" />
                    Guide
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-600">
              <span>Duration: ~{workout.duration} min</span>
              <span>Intensity: {workout.totalCalories > 400 ? 'High' : workout.totalCalories > 200 ? 'Medium' : 'Low'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
