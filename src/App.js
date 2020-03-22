import React from 'react';
import $ from 'jquery';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = 'e453207fa5d36f3f32dd22705f61e425';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    onLoadCity: undefined,
    country: undefined,
    onLoadCountry: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }

  onLoadLocation = (async (e) => {
    //e.preventDefault();
    const geo_call = await fetch(`https://geoip-db.com/json/`);
    const data = await geo_call.json();
    this.setState({
      onLoadCity:data.city,
      onLoadCountry:data.country_name
    });
    this.getWeather();
  })()

  getWeather = async (e) => {
    if(typeof e != 'undefined'){
      e.preventDefault();
      var city = e.target.elements.city.value;
      var country = e.target.elements.country.value;
    }else{
      city = this.state.onLoadCity;
      country = this.state.onLoadCity;
    }
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY}&units=imperial`);
    const data = await api_call.json();
    console.log(data);

    if(city && country){
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: '',
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please Enter correct values',
      });      
    }

  }

  render(){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form
                   getWeather={this.getWeather}
                   onLoadCity={this.state.onLoadCity}
                   onLoadCountry={this.state.onLoadCountry}
                  />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;