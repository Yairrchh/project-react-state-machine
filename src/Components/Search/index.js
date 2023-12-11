import React from "react";
import { useState } from "react";
import './Search.css'

const Search = ({state,send}) => {
    const [flight, setFlight] = useState('');

    const goToPassengers = () => {
        send({type: 'CONTINUE', selectedCountry: flight})
    }

    const handleSelectChange = (event) => {
        setFlight(event.target.value);
    }

    const options = state.context.countries;

    return (
        <div className="Search">
            <p className="Search-title title">Choose your destination</p>
            <select id='country' className='Search-select' value={flight} onChange={handleSelectChange}>
                <option value='' disabled defaultValue>Choose your Country</option>
                {options.map((option) => <option value={option.name.common} key={option.name.common}>{option.name.common}</option>)}
            </select>
            {
                flight.length > 0 && (
                    <button onClick={goToPassengers} className="Search-continue button">Continue</button>
                )
            }
        </div>
    )
}

export {Search};