import React from 'react';
import Switcher from '../components/Switcher';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import StatusHead from '../components/StatusHead';
import Hour from '../components/Hour';
import {
  fetchTotalSummaryAsync,
  selectOnlyActive,
  selectStatus,
  selectSummary,
  toggleActiveInSummary
} from '../features/employees/employeesSlice';

const GeneralSummaryPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const summary = useSelector(selectSummary);
  const onlyActive = useSelector(selectOnlyActive);

  React.useEffect(() => {
    dispatch(fetchTotalSummaryAsync(onlyActive));
  }, [dispatch, onlyActive]);

  const onToggleActive = e => {
    dispatch(toggleActiveInSummary(e.target.checked));
  }

  return (
    <>
      <StatusHead status={status}>General summary</StatusHead>
      {summary &&
      <>
        <Switcher label={'Show only active'} checked={onlyActive} onChange={onToggleActive}/>
        <Card>
          <p>Total employees: {summary.totalEmployees}</p>
          <p>Total Clocked In time: <Hour ts={summary.totalClockedInTime} /></p>
          <p>Total Productive time: <Hour ts={summary.totalProductiveTime} /></p>
          <p>Total Unproductive time: <Hour ts={summary.totalUnproductiveTime} /></p>
        </Card>
      </>
      }
    </>
  );
}

export default GeneralSummaryPage;