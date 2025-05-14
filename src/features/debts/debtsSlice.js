import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  debts: [],
  totalDebt: 0, 
};

const debtsSlice = createSlice({
  name: 'debts',
  initialState,
  reducers: {
    addDebt: (state, action) => {
      state.debts.push(action.payload);
    },
    deleteDebt: (state, action) => {
      state.debts = state.debts.filter(debt => debt.id !== action.payload);
    },
    toggleDebtStatus: (state, action) => {
      const debt = state.debts.find(debt => debt.id === action.payload);
      if (debt) debt.paid = !debt.paid;
    },
    calculateTotalDebt: (state) => {
      const totalDebt = state.debts.reduce((total, debt) => total + debt.amount, 0);
      state.totalDebt = totalDebt;
    }
  }
});

export const { addDebt, deleteDebt, toggleDebtStatus, calculateTotalDebt } = debtsSlice.actions;

export default debtsSlice.reducer;
