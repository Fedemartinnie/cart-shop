import { useReducer, createContext } from "react"
import { cartReducer, cartInitialState } from '../reducers/cart'

//1- crear contexto
export const CartContext = createContext()

function useCartReducer ()  {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState) 

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const decrementProduct = product => dispatch ({
        type: 'DECREMENT_PRODUCT',
        payload: product
    })

    const clearCart = () => dispatch({type: 'CLEAR_CART'})

    return { state, addToCart, removeFromCart, decrementProduct, clearCart}
}


//con el reducer es mas facil testear
/* ejemplo para testear el addToCart*/
/*expect(
    reducer([],{ type: 'ADD_TO_CART', payload: { id: 1 }})
).toEqual([{ id: 1, quantity: 1 }]) */

//2-crear provider
export function CartProvider ({ children }) {
    //const [cart, setCart] = useState([]) // lo reemplazo por le useReducer
    const { state, addToCart, removeFromCart, decrementProduct, clearCart} = useCartReducer()

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            decrementProduct,
            clearCart,
            removeFromCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}
    //add to Cart --> LO REEMPLAZO POR EL REDUCER => SWITCH
    /*const addToCart = product => {
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
    } */

    //decrement --> LO REEMPLAZO POR EL REDUCER --> SWITCH
    /*const decrementProduct = product => {
        const productIndex = cart.findIndex (item => item.id === product.id)

        if (productIndex >= 0) {
            const oldCart = structuredClone(cart)
            oldCart[productIndex].quantity -= 1
            // Verificar si la cantidad llega a cero y eliminar el producto del carrito
            if (oldCart[productIndex].quantity === 0) {
                removeFromCart(product)
            } else {
                setCart(oldCart)
            }
        }
    }*/

    //delete product from cart
    /*const removeFromCart = (product) => {
        setCart(prevState => prevState.filter (item => item.id !== product.id))
    }

    //clear Cart
    const clearCart = () => {
        setCart([])
    } 
    
}*/