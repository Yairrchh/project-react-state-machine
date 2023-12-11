import React from 'react';
import './Tickets.css';

const Tickets = ({ state, send }) => {
    const finish = () => {
        send({type:'FINISH'})
    };

    return (
        <div className='Tickets'>
        <p className='Tickets-description description'>Thank you for purchasing with TodoTicket💙</p>
        <div className='Tickets-ticket'>
            <div className='Tickets-country'>{state.context.selectedCountry}</div>
            <div className='Tickets-passengers'>
                <p>Ticket Tour concert coldPlay</p>
                <ul>
                    {
                        state.context.passengers.map((passengers, index) => <li className='li-ticket' key={index}>{passengers}</li>)
                    }
                </ul>
            </div>
        </div>
        <button onClick={finish} className='Tickets-finish button'>Finalizar</button>
        </div>
    );
};

export {Tickets};