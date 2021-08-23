import React from 'react';
import { Router } from "@reach/router";
import SiteWrapper from './layout/SiteWrapper';
import Heading from './layout/Heading';
import GeneralSummaryPage from './pages/GeneralSummaryPage';
import EmployeeTablePage from './pages/EmployeeTablePage';

function App() {
  return (
    <>
      <Heading />
      <SiteWrapper>
        <Router tabIndex={undefined}>
          <GeneralSummaryPage path={'/'} />
          <EmployeeTablePage path={'employees'} />
        </Router>
      </SiteWrapper>

    </>
  );
}

export default App;
