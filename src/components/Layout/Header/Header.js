import React, { Component } from 'react';
import styled from 'styled-components';



const P = styled.text`
  float: right;
  margin-right: 10px;
  color: #8CA1BE;
`;
const Div = styled.text`
  font-size: 25px;
  color: #6C6C6C;
  margin-right: 10px;
  float: right;
`;

class Header extends Component {
  componentDidMount(){
    localStorage.setItem('balance',3000);
  };

  render(){ 
  return (
    <header>
      <P>Balance</P><br/>
      <Div>${localStorage.getItem('balance')}</Div>
    </header>
   )
  }
}


export default Header;