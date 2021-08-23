import React from 'react';
import styled from 'styled-components';
import Filter from '../components/Filter';
import StatusHead from '../components/StatusHead';
import { useDispatch, useSelector } from 'react-redux';
import DebouncedInput from '../components/DebouncedInput';
import { Table, Th, Tr, Td } from '../components/Table';
import Employee from '../model/Employee';
import Hour from '../components/Hour';
import Switcher from '../components/Switcher';
import {
  fetchAvailableDateRangeAsync,
  selectOnlyActive,
  selectMinDate,
  selectMaxDate,
  selectStatus,
  selectFilter,
  selectSearchTerm,
  updateSearchTerm,
  setFilter,
  applyFilter,
  selectEmployees,
  toggleEmployeeActive,
  toggleActiveInTable
} from '../features/employees/employeesSlice';

const Row = styled.div`
  display: flex;
  max-width: 500px;
`

const TableStyled = styled(Table)`
  margin-top: 0.5rem;
`

const EmployeeTablePage = () => {

  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const onlyActive = useSelector(selectOnlyActive);
  const minDate = useSelector(selectMinDate);
  const maxDate = useSelector(selectMaxDate);
  const filter = useSelector(selectFilter);
  const searchTerm = useSelector(selectSearchTerm);
  const employees = useSelector(selectEmployees);

  React.useEffect(() => {
    dispatch(fetchAvailableDateRangeAsync(onlyActive));
  }, [dispatch, onlyActive]);

  const onChangeSearchTerm = React.useCallback((text) => {
    dispatch(updateSearchTerm(text));
  }, [dispatch]);

  const _employees = React.useMemo(() => {
    return employees?.map(e => Employee.of(e));
  }, [employees]);

  const onToggleActive = e => {
    dispatch(toggleActiveInTable(e.target.checked));
  }

  return (
    <>
      <StatusHead status={status}>Employee table</StatusHead>
      <Switcher label={'Show only active'} checked={onlyActive} onChange={onToggleActive}/>
      <Row>
        <DebouncedInput value={searchTerm} onChange={onChangeSearchTerm}/>
        <Filter minDate={minDate}
                maxDate={maxDate}
                startDate={filter?.startDate}
                endDate={filter?.endDate}
                applied={filter?.applied}
                onChange={filterValue => dispatch(setFilter(filterValue))}
                onOk={() => dispatch(applyFilter(true))}
        />
      </Row>
      { employees &&
        <TableStyled>
          <thead>
          <Tr>
            <Th>Name</Th>
            <Th>ttl Clocked-In</Th>
            <Th>ttl Productive</Th>
            <Th>ttl Unproductive</Th>
            <Th>Productivity ratio</Th>
            <Th>Active</Th>
          </Tr>
          </thead>
          <tbody>
          {
            _employees.map((e, i) => {
              const onToggle = () => {
                dispatch(toggleEmployeeActive(e.id, i));
              }
              return (
                <Tr key={i}>
                  <Td>{e.name}</Td>
                  <Td><Hour ts={e.getClockedInTime()} /></Td>
                  <Td><Hour ts={e.getProductiveTime()} /></Td>
                  <Td><Hour ts={e.getUnproductiveTime()} /></Td>
                  <Td>{e.getProductivityRatio().toFixed(2)}</Td>
                  <Td><input type={'checkbox'} checked={e.active} onChange={onToggle}/></Td>
                </Tr>
              )
            })
          }
          </tbody>
      </TableStyled>
      }
    </>
  )
}

export default EmployeeTablePage;