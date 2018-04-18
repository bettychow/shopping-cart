import React from 'react'
import CartItemComponent from './CartItemComponent'

const CartItems = ({cartItemsList, addItem}) => {

  const allItems = cartItemsList.map(item => {
    return <CartItemComponent 
             key={item.id} 
             name={item.product.name} 
             productId={item.product_id}
             price={item.product.priceInCents} 
             quantity={item.quantity} 
             addItem={addItem}
           />
  })
  
  return (
    <div className="container">
      <h1>Cart Items</h1>
      <div className="list-group">
        <div className="list-group-item">
          <div className="row">
            <div className="col-md-8">Product</div>
            <div className="col-md-2">Price</div>
            <div className="col-md-2">Quantity</div>
          </div>
        </div>
        {allItems}
      </div>
    </div>
  )
}

export default CartItems