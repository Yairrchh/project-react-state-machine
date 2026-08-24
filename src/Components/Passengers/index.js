import React, { useState } from 'react';
import './Passengers.css';

const MIN_TICKETS = 1;
const MAX_TICKETS = 8;

const Passengers = ({ send }) => {
    const [names, setNames] = useState(['']);

    const changeTicketCount = (delta) => {
        const nextCount = Math.min(MAX_TICKETS, Math.max(MIN_TICKETS, names.length + delta));
        setNames((prev) => {
            const next = prev.slice(0, nextCount);
            while (next.length < nextCount) next.push('');
            return next;
        });
    };

    const updateName = (index, value) => {
        setNames((prev) => prev.map((name, i) => (i === index ? value : name)));
    };

    const allFilled = names.every((name) => name.trim().length > 0);

    const submit = (e) => {
        e.preventDefault();
        if (!allFilled) return;
        send({ type: 'DONE', passengers: names.map((name) => name.trim()) });
    };

    return (
        <form onSubmit={submit} className='Passengers'>
            <p className='Passengers-title'>Agrega los pasajeros del vuelo</p>

            <div className='Passengers-stepper'>
                <span className='Passengers-stepperLabel'>Cantidad de tickets</span>
                <div className='Passengers-stepperControl'>
                    <button
                        type='button'
                        className='Passengers-stepperButton'
                        onClick={() => changeTicketCount(-1)}
                        disabled={names.length <= MIN_TICKETS}
                        aria-label='Quitar ticket'
                    >
                        −
                    </button>
                    <span className='Passengers-stepperCount'>{names.length}</span>
                    <button
                        type='button'
                        className='Passengers-stepperButton'
                        onClick={() => changeTicketCount(1)}
                        disabled={names.length >= MAX_TICKETS}
                        aria-label='Agregar ticket'
                    >
                        +
                    </button>
                </div>
            </div>

            <div className='Passengers-list'>
                {names.map((name, index) => (
                    <div className='Passengers-item' key={index}>
                        <span className='Passengers-itemIndex'>{String(index + 1).padStart(2, '0')}</span>
                        <input
                            type='text'
                            className='Passengers-input'
                            placeholder={`Nombre del pasajero ${index + 1}`}
                            required
                            value={name}
                            onChange={(e) => updateName(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <button className='Passengers-pay btn-primary' type='submit' disabled={!allFilled}>
                Comprar {names.length} {names.length === 1 ? 'boleto' : 'boletos'}
            </button>
        </form>
    );
};

export {Passengers}
