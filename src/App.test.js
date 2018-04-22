import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Weather from './components/weatherCard';
import WeatherCard from './components/card';
import { shallow, mount } from 'enzyme';

// Test for App Render
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Test for Weather card render
it('Weather component renders the card inside it', () => {
  const wrapper = mount(
    <Weather/>
  );
  const p = wrapper.find('.cardWidth');
  expect(p.hasClass()).toBe('cardWidth');
});


// Arrange the mock for Weather api call
jest.mock('axios', () => {
  const weatherApi = [
    { url: 'test url' }
  ];
  
  return {
    get: jest.fn(() => Promise.resolve(weatherApi)),
  };
});

const axios = require('axios');

// Test for Weather api call on component did mount
it('fetch weather details on #componentDidMount', () => {
  const app = shallow(<App />);
  app
    .instance()
    .componentDidMount()
    .then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=19.0760&lon=72.8777&appid=2c0f2991f85a0e8a38feceee641a1734');
      expect(app.state()).toHaveProperty('list', [
        { url: 'test url' }
      ]);
      done();
    });
});

