'use client';

import { useState } from 'react';
import { ChevronRight, BarChart3, Play } from 'lucide-react';

interface Exercise {
  name: string;
  description: string;
  image: string;
  form: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  sets: number;
  reps: string;
  rest: string;
  videoUrl?: string;
}

export default function Trainer({ user }: { user: any }) {
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const exercises: Exercise[] = [
    {
      name: 'Pushups',
      description: 'Classic bodyweight chest exercise',
      image: '💪',
      form: [
        'Start in plank position with hands shoulder-width apart',
        'Lower your body until chest nearly touches the floor',
        'Keep elbows at 45-degree angle to your body',
        'Push through your palms to return to starting position',
      ],
      difficulty: 'beginner',
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      sets: 3,
      reps: '8-12',
      rest: '90 seconds',
    },
    {
      name: 'Squats',
      description: 'Essential lower body movement',
      image: '🦵',
      form: [
        'Stand with feet shoulder-width apart',
        'Lower body by pushing hips back and bending knees',
        'Keep chest upright and weight in heels',
        'Lower until thighs are parallel to ground',
        'Drive through heels to return to standing',
      ],
      difficulty: 'beginner',
      targetMuscles: ['Quads', 'Hamstrings', 'Glutes'],
      sets: 3,
      reps: '12-15',
      rest: '2 minutes',
    },
    {
      name: 'Plank',
      description: 'Core stability exercise',
      image: '📊',
      form: [
        'Start in pushup position',
        'Lower to your forearms, elbows under shoulders',
        'Keep your body in a straight line',
        'Engage core and hold position',
        'Breathe steadily throughout',
      ],
      difficulty: 'beginner',
      targetMuscles: ['Core', 'Shoulders', 'Back'],
      sets: 3,
      reps: '30-60 seconds',
      rest: '90 seconds',
    },
    {
      name: 'Bench Press',
      description: 'Advanced chest strength builder',
      image: '🏋️',
      form: [
        'Lie on flat bench with feet on floor',
        'Grip bar slightly wider than shoulder-width',
        'Unrack the bar and position above chest',
        'Lower bar to mid-chest in controlled motion',
        'Push bar upward explosively until arms are extended',
      ],
      difficulty: 'advanced',
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      sets: 4,
      reps: '6-8',
      rest: '3 minutes',
    },
    {
      name: 'Deadlift',
      description: 'Ultimate full-body strength exercise',
      image: '🏋️',
      form: [
        'Stand with feet hip-width apart',
        'Bar over mid-foot, hands just outside legs',
        'Keep chest up and shoulders back',
        'Drive through heels, extending hips and knees',
        'Stand tall at the top, then lower with control',
      ],
      difficulty: 'advanced',
      targetMuscles: ['Back', 'Hamstrings', 'Glutes', 'Core'],
      sets: 3,
      reps: '3-5',
      rest: '5 minutes',
    },
  ];

  const filteredExercises = exercises.filter((ex) => ex.difficulty === difficulty);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Personal Trainer</h2>
        <p className="text-gray-600">Learn proper form and workout progressions</p>
      </div>

      {/* Difficulty Selector */}
      <div className="flex gap-2">
        {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
          <button
            key={level}
            onClick={() => {
              setDifficulty(level);
              setSelectedExercise(null);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
              difficulty === level
                ? 'bg-aqua-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Exercise Detail */}
      {selectedExercise ? (
        <div className="bg-white rounded-lg shadow p-8">
          <button
            onClick={() => {
              setSelectedExercise(null);
              setCurrentStep(0);
            }}
            className="text-aqua-500 hover:text-aqua-600 font-medium mb-4"
          >
            ← Back to exercises
          </button>

          <div className="flex items-start gap-6">
            <div className="text-8xl">{selectedExercise.image}</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedExercise.name}</h3>
              <p className="text-gray-600 mb-4">{selectedExercise.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Sets</p>
                  <p className="text-xl font-bold text-gray-900">{selectedExercise.sets}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Reps</p>
                  <p className="text-xl font-bold text-gray-900">{selectedExercise.reps}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Rest</p>
                  <p className="text-xl font-bold text-gray-900">{selectedExercise.rest}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-gray-900 mb-2">Target Muscles:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.targetMuscles.map((muscle) => (
                    <span key={muscle} className="px-3 py-1 bg-aqua-100 text-aqua-700 rounded-full text-sm font-medium">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Guide */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Proper Form Guide</h4>

            <div className="flex gap-8">
              <div className="flex-1">
                <div className="space-y-4">
                  {selectedExercise.form.map((step, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        currentStep === idx
                          ? 'bg-aqua-100 border-2 border-aqua-500'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <p className={`font-medium ${currentStep === idx ? 'text-aqua-700' : 'text-gray-900'}`}>
                        Step {idx + 1}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-gradient-to-br from-aqua-100 to-aqua-50 rounded-lg p-8 flex items-center justify-center min-h-96">
                  <div className="text-center">
                    <p className="text-6xl mb-4">📹</p>
                    <p className="font-semibold text-gray-900 mb-2">Video Tutorial</p>
                    <p className="text-sm text-gray-600 mb-4">Tap to watch form guide</p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 transition-colors mx-auto">
                      <Play className="w-4 h-4" />
                      Watch Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Exercise Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => (
            <button
              key={exercise.name}
              onClick={() => {
                setSelectedExercise(exercise);
                setCurrentStep(0);
              }}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg hover:border-aqua-300 transition-all border border-transparent text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{exercise.image}</span>
                <ChevronRight className="w-5 h-5 text-aqua-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{exercise.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-1 bg-aqua-100 text-aqua-700 rounded font-medium capitalize">
                  {exercise.difficulty}
                </span>
                <span className="text-gray-600">
                  {exercise.sets} × {exercise.reps}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Statistics */}
      {!selectedExercise && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-aqua-500" />
            Suggested Routine for {user?.name}
          </h3>
          <p className="text-gray-600 mb-4">
            Based on your current level, here's a recommended weekly routine:
          </p>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="text-center p-3 bg-aqua-50 rounded-lg">
                <p className="font-semibold text-gray-900">{day}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {idx % 2 === 0 ? 'Strength' : 'Rest'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
