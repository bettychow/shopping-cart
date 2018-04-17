import React, { Component } from 'react';
import './App.css';
import CartHeader from './Components/CartHeader';
import CartFooter from './Components/CartFooter';
import CartItems from './Components/CartItems';


class App extends Component {

  state = {
    cartItemsList: []
  }

  async componentDidMount() {
    const productsResponse = await fetch('http://localhost:8082/api/products')
    const productsJson = await productsResponse.json()
    const itemsResponse = await fetch('http://localhost:8082/api/items')
    const itemsJson = await itemsResponse.json()

    itemsJson.forEach(item => {
      for(let i = 0; i < productsJson.length; i++) {
        if(item.product_id === productsJson[i].id) {
          item.product = productsJson[i]
          break;
        }
      }
    })

    this.setState({
      cartItemsList: itemsJson
    })
  }

  addItem = (quantity, itemId) => {

    this.setState({

      cartItemsList: this.state.cartItemsList.map(cartItem => {
        if(cartItem.id === itemId) {
          cartItem.quantity = quantity
        }
        return cartItem
      })
    })
  }
  
  render() {
    const copyright = <span>&copy; 2018</span>;
     
    return (
      <div className="App">
        <CartHeader/>
        <CartItems cartItemsList={this.state.cartItemsList} addItem={this.addItem}/>
        <CartFooter copyright={copyright}/>
      </div>
    );
  }
}

export default App;
