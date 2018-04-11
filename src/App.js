import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CartHeader from './Components/CartHeader';
import CartFooter from './Components/CartFooter';
import CartItems from './Components/CartItems';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CartHeader/>
        <CartItems/>
        <CartFooter/>
        
      </div>
    );
  }
}

export default App;
