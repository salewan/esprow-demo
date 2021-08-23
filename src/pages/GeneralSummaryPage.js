import React from 'react';
import Switcher from '../components/Switcher';
import Card from '../components/Card';

import { selectStatus, selectSummary, selectOnlyActive, toggleActiveInSummary, fetchTotalSummaryAsync } from '../features/employees/employeesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Duration } from 'luxon';
import styled from 'styled-components';
import StatusHead from '../components/StatusHead';

const Bold = styled.span`
  font-weight: bold;
`

const Hour = ({ ts }) => <><Bold>{Duration.fromMillis(ts).toFormat("h")}</Bold>&nbsp;hours</>

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