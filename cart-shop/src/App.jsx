import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products'
import { useState, useContext } from 'react'
import { Header } from './components/Header'
import { useFilters } from './hooks/useFilters.js'

function App() {
  const [products] = useState(initialProducts)
  
  const {filters, filterProducts, setFilters} = useFilters()

  const filteredProducts = filterProducts(products)

  return (   
    <>
      <Header />
      <Products products={filteredProducts}/>
    </>
  )
}


export default App
