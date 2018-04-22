import React, { Component } from 'react';
import axios from 'axios';
import WeatherCard from './card';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
        weatherdata: {},
        loaded: false
    };
  }
    
  componentWillMount() {
    this.getforecastData();
  }
    
  render() {
    return (
      <div>
        <MuiThemeProvider> 
        <WeatherCard data = {this.state.weatherdata}/>
        </MuiThemeProvider> 
      </div>
    );
  }
    
  getTemperature(item) {
      return Math.round(item.main.temp - 273.15);
  }
    
  getWindSpeed(item) {
      return Math.round(item.wind.speed * 2.23694185194);
  }

  getDate(item) {
      const date = new Date(item.dt * 1000);
      const d = date.toString().split(" ");
      return d[2] + " " + d[1] + " " + d[0];
  }
    
  getTime(item) {
      const time = new Date(item.dt * 1000);
      return time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
  }
    
  modifyData(data) {
          
      const weatherItems = data.list.map((item) => {
        const maindate = new Date(item.dt * 1000);
        let temp = this.getTemperature(item);
        let windspeed = this.getWindSpeed(item);
        let date = this.getDate(item);
        let time = this.getTime(item);
      
        return {temp: temp, windspeed: windspeed, date: date, time: time, maindate: maindate, desc: item.weather[0].main, imgid: item.weather[0].icon + '.png', humidity: item.main.humidity};
      });
      
      var result = _(weatherItems)
            .groupBy(x => x.date)
            .map((value, key) => ({date: key, time: value}))
            .value();
      
     this.setState(prevState => ({
        weatherdata: {
        ...prevState.weatherdata,
        city: data.city.name,
        list: data.list,    
        country: data.city.country,
        newlist: result
        }
      }));

    this.setState({loaded: true}); 
  }
    
  getforecastData() {
    var self = this;
    axios.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=19.0760&lon=72.8777&appid=2c0f2991f85a0e8a38feceee641a1734')
             .then(function (response) {
                if(response.status === 200){
                    console.log(response.data);
                    self.modifyData(response.data);
                }
                })
             .catch(function (error) {
                console.log(error);
    });
 }
    
}

export default Weather;
