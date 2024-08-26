import { useState } from 'react'
import './Weather.scss'
import { apiKey } from '../../api/api'
import { WeatherData } from '../../types/weather'

export const Weather = () => {

    const [cityName, setCityName] = useState('')
    const [weatherInfo, setWeatherInfo] = useState<WeatherData>([])
    const [placeholder, setPlaceholder] = useState<string>('Digite a sua cidade')

    const getApi = () => {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

        fetch(url)
            .then((res) => {

                if (!res.ok) {
                    setPlaceholder('Cidade não encontrada')
                    setCityName('')
                } else {
                    setPlaceholder('Digite sua cidade')
                }

                return res.json()
            })
            .then((data) => {
                setWeatherInfo(data)
                console.log(weatherInfo)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value)
    }

    const handleClick = () => {

        getApi()

    }

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);

        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${dayOfWeek}, ${day} de ${month}, ${hours}h${minutes}`

    }

    const now = Date.now()

    return (
        <section>

            <div className='container'>
                <h1>Weather Forecast</h1>

                <div className="searchBar">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={cityName}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={handleClick}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                {weatherInfo.name ? (
                    <div className="city-info">
                        <h2>{weatherInfo.name}, {weatherInfo.sys.country}</h2>
                        <p>{formatDate(now)}</p>

                        <div className="temp-info">
                            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={weatherInfo.weather[0].description} />
                            <h2>{Math.round(weatherInfo.main.temp)}°C</h2>
                        </div>

                        <div className="description">

                            <h3>{weatherInfo.weather[0].description}</h3>

                        </div>

                        <div className="more-info">
                            <p>Temperatura Máxima: <strong>{Math.round(weatherInfo.main?.temp_max)}°C</strong></p>
                            <p>Temperatura Mínima: <strong>{Math.round(weatherInfo.main.temp_min)}°C</strong></p>
                            <p>Vento: <strong>{Math.round(weatherInfo.wind.speed)} km/h</strong></p>
                            <p>Umidade: <strong>{weatherInfo.main.humidity}%</strong></p>
                        </div>

                    </div>
                ) : (<p></p>)}


            </div>

        </section>
    )
}