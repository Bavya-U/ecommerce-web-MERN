import React from 'react'
import "./RelatedProducts.css"
import data_Product from "../Asserts/data"
import Item from "../Item/Item"
function RelatedProdects() {
  return (
      <div className='relatedproducts'>
          <h1>Related Products</h1>
          <hr />
          <div className="relatedproducts-item">
              {data_Product.map((item,i) => {
               return <Item key={i} id={item.id} name={item.name} image={item.image} mew_price={item.new_price} old_price={item.old_price}/> 
              })}
          </div>
    </div>
  )
}

export default RelatedProdects