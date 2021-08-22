import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEmployees } from './employeesAPI';

const initialState = {
  value: 0,
  employees: undefined,
  status: 'idle',
};

export const fetchEmployeesAsync = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    const response = await fetchEmployees();
    return response.data;
  }
)

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,

  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.employees = action.payload;
      })
  },
});

export const { increment, decrement, incrementByAmount } = employeesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default employeesSlice.reducer;
