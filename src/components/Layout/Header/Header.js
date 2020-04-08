import React, { Component } from 'react';



class Header extends Component {
  constructor(){
    super();
    this.state={
      balance:''
    }
  }
  componentDidMount(){
    localStorage.setItem('balance',3000);
  }


  render(){
  return (
    <header>
      <h5>Balance</h5><br/>
    <div>${localStorage.getItem('balance')}</div>
  </header>
   )
}
 }

 
export default Header;