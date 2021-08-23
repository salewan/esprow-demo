import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SwitcherStyled = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  vertical-align: middle;
  
  input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }
  
  &.round {
    border-radius: 34px;
  }

  &.round:before {
    border-radius: 50%;
  }
`
const Label = styled.div`
  font-size: 1.5rem;
  & + ${SwitcherStyled} {
    margin-left: 0.5rem;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

const Switcher = ({ onChange, checked, label }) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <SwitcherStyled>
        <input type="checkbox" onChange={onChange} checked={checked}/>
        <Slider className={"slider round"}/>
      </SwitcherStyled>
    </Container>
  )
}

Switcher.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string
}

export default Switcher;