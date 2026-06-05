'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

interface WeightLog {
  date: string;
  weight: number;
  notes: string;
}

export default function WeightTracking({ user }: { user: any }) {
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([
    { date: '2024-01-01', weight: 78, notes: 'Start of journey' },
    { date: '2024-01-08', weight: 76.5, notes: 'First week progress' },
    { date: '2024-01-15', weight: 75.8, notes: '' },
    { date: '2024-01-22', weight: 74.2, notes: 'Steady progress' },
    { date: '2024-01-29', weight: 73.5, notes: '' },
  ]);

  const [newWeight, setNewWeight] = useState(user?.weight?.toString() || '75');
  const [newNotes, setNewNotes] = useState('');

  const addWeightLog = () => {
    if (!newWeight) return;

    const today = new Date().toISOString().split('T')[0];
    const log: WeightLog = {
      date: today,
      weight: parseFloat(newWeight),
      notes: newNotes,
    };

    setWeightLogs([...weightLogs, log]);
    setNewWeight('');
    setNewNotes('');
  };

  const latestWeight = weightLogs[weightLogs.length - 1]?.weight || user?.weight || 75;
  const startWeight = weightLogs[0]?.weight || user?.weight || 75;
  const weightChange = latestWeight - startWeight;
  const weightChangePercentage = ((weightChange / startWeight) * 100).toFixed(1);

  const averageWeeklyChange = weightLogs.length > 7
    ? ((weightLogs[weightLogs.length - 1].weight - weightLogs[weightLogs.length - 8].weight) / weightLogs.length).toFixed(2)
    : 'N/A';

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Weight Tracking</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-aqua-500">
          <p className="text-gray-600 text-sm font-medium">Current Weight</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{latestWeight.toFixed(1)}</p>
          <p className="text-sm text-gray-500 mt-1">kg</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-aqua-500">
          <p className="text-gray-600 text-sm font-medium">Total Change</p>
          <div className="flex items-center gap-2 mt-2">
            {weightChange <= 0 ? (
              <TrendingDown className="w-6 h-6 text-green-500" />
            ) : (
              <TrendingUp className="w-6 h-6 text-red-500" />
            )}
            <p className={`text-3xl font-bold ${weightChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1">{weightChangePercentage}%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-aqua-500">
          <p className="text-gray-600 text-sm font-medium">Weekly Average</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{averageWeeklyChange}</p>
          <p className="text-sm text-gray-500 mt-1">kg/week</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-aqua-500">
          <p className="text-gray-600 text-sm font-medium">Total Logs</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{weightLogs.length}</p>
          <p className="text-sm text-gray-500 mt-1">entries</p>
        </div>
      </div>

      {/* Add Weight Log */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Today's Weight</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              placeholder="75.0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <input
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="e.g., Feeling light, good workout"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={addWeightLog}
            className="self-end px-6 py-2 bg-aqua-500 text-white rounded-lg hover:bg-aqua-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Log
          </button>
        </div>
      </div>

      {/* Weight Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={weightLogs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip
              formatter={(value: any) => value.toFixed(1)}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            />
            <Line type="monotone" dataKey="weight" stroke="#00BCD4" strokeWidth={2} dot={{ fill: '#00BCD4' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Feedback & Insights */}
      <div className="bg-gradient-to-r from-aqua-50 to-blue-50 rounded-lg shadow p-6 border border-aqua-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Instant Feedback</h3>
        <div className="space-y-3">
          {weightChange <= 0 ? (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-lg">✓</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Great Progress!</p>
                <p className="text-sm text-gray-600">
                  You've lost {Math.abs(weightChange).toFixed(1)}kg ({Math.abs(parseFloat(weightChangePercentage))}%) from your starting weight. Keep it up!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-lg">⚠</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Slight Increase</p>
                <p className="text-sm text-gray-600">
                  Your weight has increased by {weightChange.toFixed(1)}kg. Review your calorie intake and exercise routine.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 pt-3 border-t border-aqua-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Recommendation</p>
              <p className="text-sm text-gray-600">
                {weightChange <= -2
                  ? 'Excellent progress! Consider adjusting your diet plan to ensure sustainable weight loss.'
                  : weightChange < 0
                  ? 'You\'re on track! Continue with your current routine for consistent results.'
                  : 'Focus on increasing your daily activities and reducing caloric intake to achieve your goals.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Log History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Log History</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {[...weightLogs].reverse().map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{log.date}</p>
                {log.notes && <p className="text-sm text-gray-500">{log.notes}</p>}
              </div>
              <p className="text-lg font-bold text-aqua-600">{log.weight.toFixed(1)} kg</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
