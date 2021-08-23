import React from 'react';
import styled from 'styled-components';
import { Duration } from 'luxon';

const Bold = styled.span`
  font-weight: bold;
`

const Hour = ({ ts }) => <><Bold>{Duration.fromMillis(ts).toFormat("h")}</Bold>&nbsp;hours</>

export default Hour;