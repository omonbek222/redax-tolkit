import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDebt, deleteDebt, toggleDebtStatus, calculateTotalDebt } from './debtsSlice';

export default function Debts() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const debts = useSelector(state => state.debts.debts);
  const dispatch = useDispatch();

  const handleAddDebt = () => {
    if (name && amount) {
      dispatch(addDebt({ id: Date.now(), name, amount: parseFloat(amount), paid: false }));
      setName('');
      setAmount('');
      dispatch(calculateTotalDebt());
    }
  };

  const handleDeleteDebt = (id) => {
    dispatch(deleteDebt(id));
    dispatch(calculateTotalDebt());
  };

  const handleToggleDebtStatus = (id) => {
    dispatch(toggleDebtStatus(id));
    dispatch(calculateTotalDebt());
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Qarzdorlar</h2>
      
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Qarzdor ismi" 
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Qarz miqdori" 
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <button 
          onClick={handleAddDebt}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Qo'shish
        </button>
      </div>

      <div className="space-y-4">
        {debts.map(debt => (
          <div 
            key={debt.id} 
            className={`p-4 flex justify-between items-center border rounded-md ${
              debt.paid ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <span className="text-lg">{debt.name} - {debt.amount} so'm</span>
            <div className="flex gap-4">
              <button 
                onClick={() => handleToggleDebtStatus(debt.id)}
                className={`px-3 py-1 rounded-md ${
                  debt.paid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {debt.paid ? 'Toʻlangan' : 'Toʻlanmagan'}
              </button>
              <button 
                onClick={() => handleDeleteDebt(debt.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center font-semibold">
        <h3 className="text-lg">Jami qarz: {debts.reduce((total, debt) => total + debt.amount, 0)} so'm</h3>
      </div>
    </div>
  );
}
