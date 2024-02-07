import { createContext, useState } from "react"

//1- crear contexto
export const CartContext = createContext()

//2-crear provider
export function CartProvider ({children}) {
    const [cart, setCart] = useState([])

    //add to Cart
    const addToCart = product => {
        //setCart([...cart, product]) //una forma basica de hacerlo
        //1. check if the product is already in the cart
        const productInCartIndex = cart.findIndex(item => item.id === product.id)

        if(productInCartIndex>=0){
            //1 forma: usar structuredClone
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            setCart(newCart)
        }

        //producto !in cart
        else{
            setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
        }
    }

    //delete product from cart
    const removeFromCart = (product) => {
        setCart(prevState => prevState.filter (item => item.id !== product.id))
    }

    //clear Cart
    const clearCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            removeFromCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}