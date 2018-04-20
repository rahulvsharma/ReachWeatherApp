import React, { Component } from 'react';
import '../css/App.css';
import Weather from './weatherCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather/>
      </div>
    );
  }
}

export default App;
