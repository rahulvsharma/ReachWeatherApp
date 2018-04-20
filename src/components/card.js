import React, { Component } from 'react';
import {Card, CardText, CardMedia} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import '../css/card.css';


class WeatherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}};
  }

  componentWillReceiveProps(nextProps){
    this.setState({data: nextProps.data})
  }
    
  render() {
        if(this.state.data.newlist) {
            return (
      <div>
        {this.state.data.newlist.map((item, index) => (
            <Card
            key={'card' + index}
            className="cardWidth"
            >
            <div className="card-color">
            <h4>{this.state.data.city} , {this.state.data.country}</h4>
                <h5>{item.date}</h5>
            <CardMedia>
                <img src={require('../img/' + item.time[0].imgid)} alt="img" className="imgStyle" />
            </CardMedia>
            <CardText>
             
               <p className="temp">{item.time[0].temp}</p>
            
            <div className="float-left"><img src={require('../img/raindrop.png')} alt="img" className="iconStyle" /> </div>
            <div className="humid_style">{item.time[0].humidity} %</div>
            <div className="float-left"><img src={require('../img/wind.png')} alt="img" className="iconStyle" /> </div>
            <div className="wind_style">{item.time[0].windspeed} mph</div>
             
            
            {item.time.map((val, index) => (
                <div key={'hs' + index} className="hourStyle">
                <div>{val.time}</div>
                <img src={require('../img/' + val.imgid)} alt="img" className="hourimgStyle" />
                <div className="smalltemp">{val.temp}</div>
                </div>
            ))
            }
            
            </CardText>
            </div>
            </Card>
        ))}


      </div>
    );
        }
    else {
        return (
            <div>
                <LinearProgress mode="indeterminate" />    
            </div>
        );
    }
  }
}

export default WeatherCard;