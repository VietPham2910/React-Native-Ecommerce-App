import React from 'react'

export const CartContext = React.createContext({})


export default function CartProvider({children}){
   const [cartCount, setCartCount] = React.useState(0)

   return(
     <CartContext.Provider value={{
        count: cartCount, setCount: setCartCount
     }}
     >
       {children}
     </CartContext.Provider>
   )
}
