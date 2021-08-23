import React from 'react';
import styled from 'styled-components';
import Filter from '../components/Filter';
import {
  fetchAvailableDateRangeAsync, selectOnlyActive, selectMinDate, selectMaxDate,
  selectStatus, selectFilter, setFilter, setFilterApplied, selectSearchTerm, setSearchTerm
} from '../features/employees/employeesSlice';
import StatusHead from '../components/StatusHead';
import { useDispatch, useSelector } from 'react-redux';
import DebouncedInput from '../components/DebouncedInput';

const Row = styled.div`
  display: flex;
  max-width: 500px;
`

const EmployeeTablePage = () => {

  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const onlyActive = useSelector(selectOnlyActive);
  const minDate = useSelector(selectMinDate);
  const maxDate = useSelector(selectMaxDate);
  const filter = useSelector(selectFilter);
  const searchTerm = useSelector(selectSearchTerm);

  React.useEffect(() => {
    dispatch(fetchAvailableDateRangeAsync(onlyActive));
  }, [dispatch, onlyActive]);

  const onChangeSearchTerm = React.useCallback((text) => {
    dispatch(setSearchTerm(text));
  }, [dispatch]);

  return (
    <>
      <StatusHead status={status}>Employee table</StatusHead>
      <Row>
        <DebouncedInput value={searchTerm} onChange={onChangeSearchTerm}/>
        <Filter minDate={minDate}
                maxDate={maxDate}
                startDate={filter?.startDate}
                endDate={filter?.endDate}
                applied={filter?.applied}
                onChange={filterValue => dispatch(setFilter(filterValue))}
                onOk={() => dispatch(setFilterApplied(true))}
        />
      </Row>
    </>
  )
}

export default EmployeeTablePage;