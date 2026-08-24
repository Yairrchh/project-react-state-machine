import React from "react";
import { useState } from "react";
import { getFlightOptions } from "../../Utils/api";
import './Search.css'

const Search = ({state,send}) => {
    const [destination, setDestination] = useState('');
    const [selectedOptionId, setSelectedOptionId] = useState('');

    const flightOptions = destination ? getFlightOptions(destination) : [];
    const selectedOption = flightOptions.find((option) => option.id === selectedOptionId);

    const goToPassengers = () => {
        send({
            type: 'CONTINUE',
            selectedCountry: destination,
            selectedPrice: selectedOption.price,
            selectedDate: selectedOption.date,
            selectedTime: selectedOption.time,
        })
    }

    const handleSelectChange = (event) => {
        setDestination(event.target.value);
        setSelectedOptionId('');
    }

    const countries = state.context.countries;

    return (
        <div className="Search">
            <p className="Search-title">Elige tu destino</p>
            <div className="Search-selectWrap">
                <select id='country' className='Search-select' value={destination} onChange={handleSelectChange}>
                    <option value='' disabled defaultValue>Selecciona un país</option>
                    {countries.map((option) => <option value={option.name.common} key={option.name.common}>{option.name.common}</option>)}
                </select>
                <span className="Search-selectIcon" aria-hidden="true">▾</span>
            </div>
            {
                flightOptions.length > 0 && (
                    <>
                        <ul className="Search-options">
                            {flightOptions.map((option) => (
                                <li key={option.id}>
                                    <button
                                        type="button"
                                        className={`Search-option${option.id === selectedOptionId ? ' Search-option--selected' : ''}`}
                                        onClick={() => setSelectedOptionId(option.id)}
                                    >
                                        <span className="Search-optionInfo">
                                            <span className="Search-optionFare">{option.fareClass}</span>
                                            <span className="Search-optionDate">{option.date} · {option.time}</span>
                                        </span>
                                        <span className="Search-optionPrice">${option.price}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {
                            selectedOption && (
                                <button onClick={goToPassengers} className="Search-continue btn-primary">Continuar</button>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export {Search};
