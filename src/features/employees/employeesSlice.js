import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, fetchTotalSummary, fetchAvailableDateRange, updateEmployee } from './employeesAPI';

const initialState = {
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
  async (params) => {
    const response = await fetchEmployees(params);
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

export const updateEmployeeAsync = createAsyncThunk(
  'employees/updateEmployee',
  async (employee) => {
    const response = await updateEmployee(employee);
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
    },
    toggleEmployee: (state, action) => {
      state.employees[action.payload].active = !state.employees[action.payload].active;
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
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {})
  },
});

export const { setOnlyActive, setFilter, setFilterApplied, setSearchTerm, toggleEmployee } = employeesSlice.actions;

export const selectSummary = (state) => state.employees.summary;
export const selectStatus = (state) => state.employees.status;
export const selectOnlyActive = (state) => state.employees.onlyActive;
export const selectMinDate = (state) => state.employees.minDate;
export const selectMaxDate = (state) => state.employees.maxDate;
export const selectFilter = (state) => state.employees.filter;
export const selectSearchTerm = (state) => state.employees.searchTerm;
export const selectEmployees = (state) => state.employees.employees;

export const toggleActiveInSummary = (checked) => (dispatch) => {
  dispatch(setOnlyActive(checked));
}

export const updateSearchTerm = (searchTerm) => (dispatch, getState) => {
  dispatch(setSearchTerm(searchTerm));
  const filter = selectFilter(getState());
  const onlyActive = selectOnlyActive(getState());
  dispatch(fetchEmployeesAsync({ searchTerm, filter, onlyActive } ));
}

export const applyFilter = (apply) => (dispatch, getState) => {
  const filter = selectFilter(getState());
  const searchTerm = selectSearchTerm(getState());
  const onlyActive = selectOnlyActive(getState());
  const applied = !!(apply && filter?.startDate && filter?.endDate);
  dispatch(setFilterApplied(applied))
  dispatch(fetchEmployeesAsync({ searchTerm, filter, onlyActive } ));
}

export const toggleEmployeeActive = (employeeId, index) => (dispatch, getState) => {
  dispatch(toggleEmployee(index));
  const e = getState().employees.employees[index];
  dispatch(updateEmployeeAsync(e));
}

export const toggleActiveInTable = (checked) => (dispatch, getState) => {
  dispatch(setOnlyActive(checked));
  const filter = selectFilter(getState());
  const searchTerm = selectSearchTerm(getState())
  dispatch(fetchEmployeesAsync({ searchTerm, filter, onlyActive: checked } ));
}

export default employeesSlice.reducer;
