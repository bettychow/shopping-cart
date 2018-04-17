import React from 'react'

const CartItemComponent = ({name, price, quantity, itemId, addItem}) => {
  const handleCllick = (quantity, itemId) => {
    let quan = quantity + 1
    addItem(quan, itemId)
  }
  return (
    <div className="list-group-item">
      <div className="row">
          <div className="col-md-8">{name}</div>
          <div className="col-md-2">{(price*.1).toFixed(2)}</div>
          <div className="col-md-2">{quantity}</div>
          <button onClick={() => handleCllick(quantity, itemId)} >Add 1 Item</button>
      </div>
    </div>
  )
}

export default CartItemComponent