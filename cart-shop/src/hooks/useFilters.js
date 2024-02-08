import { useContext } from 'react'
import { FiltersContext } from '../context/filters.jsx'

export function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext)

    const filterProducts = (products) => { // Cambié el nombre aquí
        return products.filter(product => {
          return (
            product.price >= filters.minPrice && (
              filters.category === 'all' 
              || product.category === filters.category
            )
          )
        })
      }

    return { filters, filterProducts, setFilters }
}
