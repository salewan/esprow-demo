import React from 'react';
import styled from 'styled-components';

const CardStyled = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  max-width: 500px;
  padding: 2px 16px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const Card = ({ children }) => {

  return (
    <CardStyled>{children}</CardStyled>
  )
}

export default Card;