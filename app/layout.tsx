'use client';

import type { Metadata } from 'next';
import './globals.css';
import useAuth from '@/app/hooks/useAuth';

export const metadata: Metadata = {
  title: 'Sludge67 - Fitness & Calorie Tracker',
  description: 'Sludge67: Complete fitness tracking app with workout training, calorie tracking, BMI analysis, and diet planning',
};

function AuthInitializer({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthInitializer>
      <html lang="en">
        <body className="bg-gray-50">{children}</body>
      </html>
    </AuthInitializer>
  );
}
