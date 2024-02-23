'use client'
import { useEffect, useState } from 'react';
import './index.scss'

const Clima = () => {

  const[search, setSearch] = useState('')
  const[loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)


  const fetchWeatherData = async (param) => {
    setLoading(true)
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&units=metric&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`, {
      method: 'GET'
    }
    )
    const data =  await response.json()
    if(data){
      setWeatherData(data)
      setLoading(false)
    }
    }
   
    catch(error){
      setLoading(false)
      console.error('Could not fetch Api', error.message)
    }
  }

  useEffect(()=>{
    fetchWeatherData, []
  })

  const handleChange = (e) =>{
    setSearch(e.target.value)
  }

  const handleClick = () => {
    fetchWeatherData(search)
  }

  console.log(weatherData)

  const getDate = () => {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <main>
      <section className='input-search'>
        <input onChange={handleChange} type="text" />
        <button onClick={handleClick}>Search</button>
      </section>
      {weatherData ? 
      <section className='information'>
        {loading ? <p>Loading...</p> :
        <ul>
          <li className='city'>{weatherData?.name}</li>
          <li className='date'>{getDate()}</li>
          <li className='temp'>{weatherData?.main.temp} °C</li>
          <li className='weather'>{weatherData?.weather[0].main}</li>
        </ul>
        }
        <section className='wind-humidity'>
          <article>
            <p>{weatherData?.wind.speed} km/h</p>
            <p>Wind speed</p>
          </article>
          <article>
            <p>{weatherData?.main.humidity}%</p>
            <p>Humidity</p>
          </article>
        </section>
      </section> : null
    }
    </main>
  );
}

export default Clima;