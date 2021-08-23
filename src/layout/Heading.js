import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
`

const Li = styled.li`
  float: left;
  a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  a:hover:not(.active) {
    background-color: #111;
  }

  .active {
    background-color: #04AA6D;
  }
`

const Heading = () => {
  return (
    <Ul>
      <Li><a className="active" href="#home">Home</a></Li>
      <Li><a href="#news">News</a></Li>
      <Li><a href="#contact">Contact</a></Li>
      <Li><a href="#about">About</a></Li>
    </Ul>
  )
}

export default Heading;