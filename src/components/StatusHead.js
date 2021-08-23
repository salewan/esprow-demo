import React from 'react';
import styled from 'styled-components';
import Loading from './Loading';

const Container = styled.div`
  display: flex;
  align-items: center;
  h1 + div {
    margin-left: 1rem;
  }
`

const StatusHead = ({ children, status }) => {
  return (
    <Container>
      <h1>{children}</h1>
      <Loading active={status === 'loading'}/>
    </Container>
  )
}

export default StatusHead;