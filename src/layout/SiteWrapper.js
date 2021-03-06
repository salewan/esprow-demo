import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 30px;
`
const SiteWrapper = ({ children }) => {

  return <Wrapper>{children}</Wrapper>
}

export default SiteWrapper;