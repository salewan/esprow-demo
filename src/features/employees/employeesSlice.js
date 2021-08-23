import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, fetchTotalSummary } from './employeesAPI';

const initialState = {
  value: 0,
  employees: undefined,
  status: 'idle',
  summary: undefined,
  onlyActive: true
};

export const fetchEmployeesAsync = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    const response = await fetchEmployees();
    return response.data;
  }
)

export const fetchTotalSummaryAsync = createAsyncThunk(
  'employees/fetchTotalSummary',
  async (active) => {
    const response = await fetchTotalSummary(active);
    return response.data;
  }
)

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,

  reducers: {
    setOnlyActive: (state, action) => {
      state.onlyActive = action.payload;
    }
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
      .addCase(fetchTotalSummaryAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTotalSummaryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.summary = action.payload;
      })
  },
});

export const { setOnlyActive } = employeesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export const selectSummary = (state) => state.employees.summary;

export const selectStatus = (state) => state.employees.status;

export const selectOnlyActive = (state) => state.employees.onlyActive;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    // dispatch(incrementByAmount(amount));
  }
};

export const toggleActiveInSummary = (checked) => (dispatch) => {
  dispatch(setOnlyActive(checked));

}

export default employeesSlice.reducer;
