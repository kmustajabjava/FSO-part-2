import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({country: {name, capital, population, languages, flags}}) => 
{
    const [weather, setWeather] = useState([])
    const lang = Object.entries(languages)
    useEffect(() => {
      const access_key = '535bbb363ff3733635e7b87b2f3e61bd'
      axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=' + capital + '&appid=' + access_key)
      .then(response =>{
        console.log('promise fulfilled')
        setWeather(response.data)
      })
    }, [capital])
    return (
      <div>
         <h1>{name.common}</h1>
          <p>Capital: {capital} </p>
          <p>Population: {population}</p>
          <h3>Languages:</h3>
            {
            lang.map( language => 
                <li key={language[0]}>
                {language[1]}
                </li>)
            }
          <img src={flags.png} alt={flags.alt}/>
          <h2>Weather in {capital[0]}</h2>
          {
          weather.length === 0
          ? <p></p>
          : <div>
            <p>
            Temperature:  {(weather.main.temp - 273.15).toFixed(1)} 
            </p>
            <img src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'} alt={weather.weather[0].description} />
            <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          }
      </div>
    )
  }
export default Country