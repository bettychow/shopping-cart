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
    const itemsList = itemsJson.slice(0)
    const nonDuplicatingList = [itemsList[0]]

    for(let i = 1; i < itemsList.length; i++) {
      let productNotExist = true
      for(let j = 0; j < nonDuplicatingList.length; j++) {
        if(itemsList[i].product_id === nonDuplicatingList[j].product_id) {
          nonDuplicatingList[j].quantity += itemsList[i].quantity
          productNotExist = productNotExist && false
        }
      }

      if(productNotExist) {
        nonDuplicatingList.push(itemsList[i])
      }
    }

    nonDuplicatingList.forEach(item => {
      for(let i = 0; i < productsJson.length; i++) {
        if(item.product_id === productsJson[i].id) {
          item.product = productsJson[i]
          break;
        }
      }
    })

    this.setState({
      cartItemsList: nonDuplicatingList
    })
  }

  addItem = (quantity, productId) => {

    this.setState({
      cartItemsList: this.state.cartItemsList.map(cartItem => {
        if(cartItem.product_id === productId) {
          cartItem.quantity += quantity
        }
        return cartItem
      })
    })

    const item = {}
    item.productId = productId
    item.quantity = quantity

    this.createItem(item)
  }

  async createItem(item) {
    const response = await fetch('http://localhost:8082/api/items', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const newItem = await response.json()
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
