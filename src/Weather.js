import React from 'react';
import axios from 'axios';
import './Weather.css';

class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            city: 'Tel Aviv',
            weather: {},
        };
        this.fetchData = this.fetchData.bind(this);
    }


    fetchData = (cityName) => {
        const key = 'fcbd0b49aeaedc2399b10f80545ae74a';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
        console.log(url)
        axios.get(url).then((res) =>{
            console.log(res);
            if (res.status === 200){
                this.setState({weather: res.data});
            }
        });
    }

    componentDidMount() {
        this.fetchData(this.state.city);
    }

    componentDidUpdate(prevProps) {
        if (this.props.city !== prevProps.city) {
            this.fetchData(this.props.city);
        }
    }

    render(){
        const { weather } = this.state;
        if(weather.main){
            return(
                <div className="Result">
                    <div>{weather.name}</div>
                    <div>{`${weather.main.temp}°`}</div>
                    <div>{weather.weather[0].description}</div>
                    <div>{`feels like ${weather.main.feels_like}°`}</div>
                </div>
            );        
        }

        return <div>Loading...</div>
    }
}

export default Weather; 