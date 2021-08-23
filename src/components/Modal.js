import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Background = styled.div` 
  position: fixed;
  z-index: 1; 
  padding-top: 100px; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
`

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  text-align: center;
`

const Close = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`
const Modal = ({ children, open, onClose }) => {
  return (
    <>
      { open ?
        <Background>
          <ModalContent>
            <Close onClick={onClose}>&times;</Close>
            {children}
          </ModalContent>
        </Background>

        : null
      }
    </>
  )
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default Modal;