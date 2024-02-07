import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products'
import { useState, useContext } from 'react'
import { Header } from './components/Header'
import { useFilters } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'


function App() {
  const [products] = useState(initialProducts)
  
  const {filters, filterProducts, setFilters} = useFilters()

  const filteredProducts = filterProducts(products)

  return (   
    <CartProvider>
      <Header />
      <Cart/>
      <Products products={filteredProducts}/>
    </CartProvider>
  )
}


export default App
