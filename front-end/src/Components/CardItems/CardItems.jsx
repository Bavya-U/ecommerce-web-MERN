import React, { useContext } from 'react'
import "./CardItems.css"
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from "../Asserts/cart_cross_icon.png"
function CardItems() {
    const {getTotalCartAmount,all_product,carItems, removeFromCart}=useContext(ShopContext)
  return (
      <div className='carditems'>
          <div className="coretitems-format-main">
              <p>Products</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
          </div>  
          <hr />
          {all_product.map((e) => {
              if (carItems[e.id]>0)
              {
                return <div>
                <div className="carditems-formate coretitems-format-main">
                    <img src={e.image} alt="" className="carticon-product-icon" />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitems-quantity'>{carItems[e.id]}</button>
                        <p>${e.new_price*carItems[e.id]}</p>
                    <img className="carditems-remove-icon" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                </div>
                <hr />
            </div>
              }
              return null;
          })}
          <div className="cartitems-down">
              <div className="cartitems-total">
                  <h1>Cart Totals</h1>
                  <div>
                      <div className="cartitems-total-item">
                          <p>SubTotal</p>
                          <p>${getTotalCartAmount()}</p>
                      </div>
                      <hr />
                      <div className="cartitems-total-item">
                          <p>Shipping Free</p>
                          <p>Free</p>
                      </div>
                      <hr />
                      <div className="cartitems-total-items">
                          <h3>Total</h3>
                          <h3>${getTotalCartAmount()}</h3>
                      </div>
                  </div>
                  <button>PROCEED TO CHECKOUT</button>
              </div>
              <div className="cartitems-promocode">
                  <p>If you have a promo code, Enter it here</p>
                  <div className="cartitems-promobox">
                      <input type="text" placeholder='promo code' />
                      <button>Submit</button>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default CardItems