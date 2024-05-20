import React from 'react'
import "./NewCollection.css"
import Item from "../Item/Item"
import new_collection from "../Asserts/new_collections"
function NewCollection() {
  return (
      <div className='newcollections'>
          <h1>NEW COLLECTIONS</h1>
          <hr />
          <div className="collections">
              {new_collection.map((item, i) => {
                  return <Item key={i} id={item.id} name={item.name} image={item.image} mew_price={item.new_price} old_price={item.old_price}/>
              })}
          </div>
    </div>
  )
}

export default NewCollection