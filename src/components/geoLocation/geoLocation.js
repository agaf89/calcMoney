import React, { Component } from 'react';
import Spinner from '../spinner/spinner'
import './geoLocation.css'

export default class Weather extends Component{
    constructor(props){
        super(props)
        this.state = {
            weatherData: {
                temp: null,
                city: null,
                cloud: null,
                img: null
            },
            isLoaded: false,
            isError: false
        }
        this.errorResponse = this.errorResponse.bind(this)
    }
    componentDidMount(){
        this.reqWeather();
    }
    reqWeather(){
        navigator.geolocation.getCurrentPosition( (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log(latitude,longitude)
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1a19afc9a8ec2f8110dda5a85de72ece&lang=ru`)
            .then(res => {
                return res.json()
            })
            .then(json => {
                this.setState(()=>{
                    const jsonResponse = json
                    let transformTemp = Math.round(jsonResponse.main.temp - 273)
                    if ( transformTemp > 0 ){
                        transformTemp = '+' + transformTemp
                    } else {
                        transformTemp = '-' + transformTemp
                    }
                    console.log(jsonResponse)
                    return {
                        weatherData: {
                            temp: transformTemp,
                            city: jsonResponse.name,
                            cloud: jsonResponse.weather[0].description,
                            img: jsonResponse.weather[0].icon
                        },
                        isLoaded: true
                    }
                })
            }).catch(this.errorResponse)
            
        })
    }
    errorResponse(){
        this.setState(()=>{
            
            return{
                weatherData: this.state.weatherData,
                isLoaded: this.state.isLoaded,
                isError: true
            }
        })
        console.log(this.state.isError)
    }
    

    render(){
        const {weatherData:{temp, city, cloud,img},isLoaded, isError} = this.state
        if(!isLoaded && !isError){
            return <Spinner/>
        } else if(!isLoaded && isError){
            return(
                <div className='weather'>
                    <div className='error'>
                        <b className='error-message'>Что-то пошло не так!!!</b>
                    </div>
                    <div className='cloud'>
                        
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className='weather'>
                    <img className='weather_img' src={`https://openweathermap.org/img/wn/${img}@2x.png`} alt='weather'/>
                    <div>
                        <b>{city} </b>
                        {temp} &deg;С
                    </div>
                    <div className='cloud'>
                        {cloud}
                    </div>
                </div>
            )
        }
       
    }
}








