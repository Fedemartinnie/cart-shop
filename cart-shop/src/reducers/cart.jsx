
export const cartInitialState = []

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    DECREMENT_PRODUCT: 'DECREMENT_PRODUCT',
    CLEAR_CART: 'CLEAR_CART'
}


export const cartReducer = (state, action) => {
    const {type: actionType, payload: actionPayload} = action

    switch (actionType){
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)
            
            if(productInCartIndex>=0){
                //1 forma: usar structuredClone
                //const newCart = structuredClone(cart)

                //2ªforma
                const newState = [...state]
                newState[productInCartIndex].quantity += 1
                return newState

                //3ª forma
                /*const newState = state.map(item => {
                  if(item.id === product.id){
                    return{
                      ...item,
                      quantity: item.quantity + 1
                    }
                  }
                  return item
                })*/
            }
            else{
                return [
                    ...state,
                    {
                        ...actionPayload, //product
                        quantity: 1
                    }
                ]
                
            }
        }

        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            const { id } = actionPayload
            //return cart.filter (item => item.id !== id)
            return state.filter(item => item.id!==id)
        }

        case CART_ACTION_TYPES.DECREMENT_PRODUCT: {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)
            
            if(productInCartIndex>=0){
                //1 forma: usar structuredClone
                const newState = [...state]
                newState[productInCartIndex].quantity -= 1

                if(newState[productInCartIndex].quantity === 0){
                    const { id } = actionPayload
                     //return cart.filter (item => item.id !== id)
                     return state.filter (item => item.id !== id)
                }              
                return newState
            }
            
        }

        case CART_ACTION_TYPES.CLEAR_CART: {
            return cartInitialState
        }
    }
    return state
}

/*export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

// update localStorage with state for cart
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
      // 👀 una forma sería usando structuredClone
      // const newState = structuredClone(state)
      // newState[productInCartIndex].quantity += 1

      // 👶 usando el map
      // const newState = state.map(item => {
      //   if (item.id === id) {
      //     return {
      //       ...item,
      //       quantity: item.quantity + 1
      //     }
      //   }

      //   return item
      // })

      // ⚡ usando el spread operator y slice
      const newState = [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
        ...state.slice(productInCartIndex + 1)
      ]

      updateLocalStorage(newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...action.payload, // product
        quantity: 1
      }
    ]

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  }
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}*/