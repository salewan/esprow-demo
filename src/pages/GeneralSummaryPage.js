import React from 'react';
import Switcher from '../components/Switcher';
import Card from '../components/Card';

const GeneralSummaryPage = () => {
  return (
    <>
      <h1>General summary</h1>
      <Switcher label={'Show only active'}/>
      <Card>
          <p>Total employees: 200</p>
          <p>Total Clocked In time: 2000 hours </p>
          <p>Total Productive time: 200 hours</p>
          <p>Total Unproductive time: 100 hours</p>
      </Card>
    </>
  )
}

export default GeneralSummaryPage;