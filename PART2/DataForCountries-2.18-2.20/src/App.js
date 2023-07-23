import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFiltercountries] = useState([]) 

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
      setCountries(response.data)
      })
  }, [])
  
  const handleFilter = (name) => {
    setFiltercountries(countries.filter(country => country.name.common.toLowerCase().includes(name.target.value.toLowerCase())))
  }

  return (
    <div>
      <form>
        find countries <input onChange={handleFilter}/>
      </form>
      {
      filteredCountries.length > 10 
      ? <div>Too many matches, specify another filter</div>
      : <Filter filteredCountries={filteredCountries} setFiltercountries={setFiltercountries}/>}

    </div>
  )
}

export default App