import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sludge67 - Fitness & Calorie Tracker',
  description: 'Sludge67: Complete fitness tracking app with workout training, calorie tracking, BMI analysis, and diet planning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
