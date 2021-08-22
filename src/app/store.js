import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employeesReducer from '../features/employees/employeesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    employees: employeesReducer
  },
});
