import React from 'react';

const Form = props => (
    <form onSubmit={props.getWeather}>
        <input type='text' name='city' placeholder={props.onLoadCity}/>
        <input type='text' name='country' placeholder={props.onLoadCountry}/>
        <button>Get Weather</button>
    </form>
);

export default Form;