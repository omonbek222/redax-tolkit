import React from 'react';
import Debts from './features/debts/Debts';
import Timer from './features/timer/Timer';
import Notifications from './features/notifications/Notifications';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Qarzdorlar App + Timer + Notification
      </h1>

      <Notifications />

      <div className="w-full max-w-3xl space-y-8">
        <Debts />
        <Timer />
      </div>
    </div>
  );
}

export default App;
