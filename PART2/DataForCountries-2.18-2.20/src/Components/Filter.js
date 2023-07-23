import Country from "./Country"
const Filter = ({filteredCountries, setFiltercountries}) => {
         console.log('Possible Matches:' , filteredCountries.length)
        if(filteredCountries.length === 1 )//if search matches exactly one country
        { 
          return (
          <div>
            {/* show the matched search country details */}
            <Country country={filteredCountries[0]}/> 
          </div>) 
        }
        else 
        {
          return(
          filteredCountries.map(country => //else shows countries matching the required search with a show button
          <li key={country.name.official}> 
          {country.name.common} 
          <button onClick={() => setFiltercountries([country])}>show</button> 
          {/* upon click the filtered country will be set as a only one country that matches the search and its data will be displayed */}
          </li>)

          )
      }
}

  export default Filter