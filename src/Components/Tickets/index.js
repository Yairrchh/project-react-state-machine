import React, { useMemo } from 'react';
import { getAirportCode, generatePNR } from '../../Utils/api';
import { PlaneIcon } from '../Icons/PlaneIcon';
import './Tickets.css';

const Tickets = ({ state, send }) => {
    const finish = () => {
        send({type:'FINISH'})
    };

    const { selectedCountry, selectedPrice, selectedDate, selectedTime, passengers } = state.context;
    const total = selectedPrice * passengers.length;
    const airportCode = getAirportCode(selectedCountry);
    const pnr = useMemo(() => generatePNR(), []);

    return (
        <div className='Tickets'>
            <p className='Tickets-thanks'>¡Gracias por volar con Todoticket!</p>

            <div className='Boarding'>
                <div className='Boarding-stamp' aria-hidden='true'>Confirmado</div>
                <div className='Boarding-route'>
                    <span className='Boarding-pnr'>{pnr}</span>
                    <div className='Boarding-routeNode'>
                        <span className='Boarding-routeCode'>AQUÍ</span>
                        <span className='Boarding-routeLabel'>Origen</span>
                    </div>
                    <span className='Boarding-routePlane'><PlaneIcon size={16} /></span>
                    <div className='Boarding-routeNode'>
                        <span className='Boarding-routeCode'>{airportCode}</span>
                        <span className='Boarding-routeLabel'>Destino</span>
                    </div>
                </div>

                <p className='Boarding-flightLine'>Vuelo a {selectedCountry} · {selectedDate} · {selectedTime}</p>

                <div className='Boarding-tear' aria-hidden='true' />

                <div className='Boarding-fields'>
                    <div className='Boarding-field'>
                        <span className='Boarding-fieldLabel'>Pasajeros</span>
                        <ul className='Boarding-passengerList'>
                            {passengers.map((passenger, index) => <li key={index}>{passenger}</li>)}
                        </ul>
                    </div>
                    <div className='Boarding-field Boarding-field--right'>
                        <span className='Boarding-fieldLabel'>Precio / persona</span>
                        <span className='Boarding-fieldValue'>${selectedPrice}</span>
                    </div>
                </div>

                <div className='Boarding-total'>
                    <span>Total · {passengers.length} {passengers.length === 1 ? 'pasajero' : 'pasajeros'}</span>
                    <strong>${total}</strong>
                </div>

                <div className='Boarding-barcode' aria-hidden='true' />
            </div>

            <button onClick={finish} className='Tickets-finish btn-primary'>Finalizar</button>
        </div>
    );
};

export {Tickets};
