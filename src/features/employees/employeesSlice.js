import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, fetchTotalSummary, fetchAvailableDateRange } from './employeesAPI';

const initialState = {
  value: 0,
  employees: undefined,
  status: 'idle',
  summary: undefined,
  onlyActive: true,
  minDate: undefined,
  maxDate: undefined,
  filter: undefined,
  searchTerm: undefined
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

export const fetchAvailableDateRangeAsync = createAsyncThunk(
  'employees/fetchAvailableDateRange',
  async (active) => {
    const response = await fetchAvailableDateRange(active);
    return response.data;
  }
)

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,

  reducers: {
    setOnlyActive: (state, action) => {
      state.onlyActive = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
      if (!action.payload.endDate || !action.payload.startDate) {
        state.filter.applied = false;
      }
    },
    setFilterApplied: (state, action) => {
      state.filter.applied = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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
      .addCase(fetchAvailableDateRangeAsync.fulfilled, (state, action) => {
        state.minDate = action.payload.minDate;
        state.maxDate = action.payload.maxDate;
      })
  },
});

export const { setOnlyActive, setFilter, setFilterApplied, setSearchTerm } = employeesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export const selectSummary = (state) => state.employees.summary;

export const selectStatus = (state) => state.employees.status;

export const selectOnlyActive = (state) => state.employees.onlyActive;

export const selectMinDate = (state) => state.employees.minDate;
export const selectMaxDate = (state) => state.employees.maxDate;
export const selectFilter = (state) => state.employees.filter;
export const selectSearchTerm = (state) => state.employees.searchTerm;

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
