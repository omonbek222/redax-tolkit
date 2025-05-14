import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startTimerWithInterval,
  stopTimerWithInterval,
  resetTimer,
} from './timerSlice';

export default function Timer() {
  const time = useSelector((state) => state.timer.seconds);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">⏱ Timer</h2>

      <div className="text-5xl font-bold text-blue-500 mb-6">{time} s</div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => dispatch(startTimerWithInterval())}
          disabled={isRunning}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={() => dispatch(stopTimerWithInterval())}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Stop
        </button>
        <button
          onClick={() => dispatch(resetTimer())}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
