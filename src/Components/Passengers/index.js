import React, { useState } from 'react';
import './Passengers.css';

const Passengers = ({ state, send }) => {
    const [value, changeValue] = useState('');

    const onChangeInput = (e) => {
        changeValue(e.target.value);
    }

    const goToTicket = () => {
        send({type: 'DONE'})
    }

    const submit = (e) => {
        e.preventDefault();
        send({type: 'ADD', newPassengers: value})
        changeValue('');
    }

    return (
        <form onSubmit={submit} className='Passengers'>
            <p className='Passengers-title title'>Add people who are going to the concert</p>
            <ul>
            {
                state.context.passengers.length > 0 &&
                    state.context.passengers.map((passengers, index) => <li key={index}>{passengers}</li>)
            }
            </ul>
            <input
                id="name"
                name="name"
                type="text"
                placeholder='Write the full name'
                required
                value={value}
                onChange={onChangeInput}
            />
            <div className='Passengers-buttons'>
                <button
                className='Passengers-add button-secondary'
                type="submit"
                >
                Add people
                </button>
                {
                    state.context.passengers.length > 0 && (
                    <button
                    className='Passengers-pay button'
                    type="button"
                    onClick={goToTicket}
                    >
                    Buy ticket
                    </button>
                    )
                }
            </div>
        </form>
    );
};

export {Passengers}