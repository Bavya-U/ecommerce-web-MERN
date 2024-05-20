import React, { createContext, useState } from "react";
import all_product from "../Components/Asserts/all_product"

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 1; index < all_product.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [carItems,setCartItems] = useState(getDefaultCart())


    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        console.log(carItems)
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in carItems) {
            if (carItems[item]>0)
            {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * carItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in carItems)
        {
            if (carItems[item] > 0) {
                totalItem += carItems[item];
            }
        }
        return totalItem;
}

    const contextValue = { getTotalCartItems,getTotalCartAmount,all_product,carItems,addToCart,removeFromCart}


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider