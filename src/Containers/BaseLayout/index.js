import React from 'react';
import { useMachine } from '@xstate/react';
import {bookingMachine} from '../../Machines/bookingMachine';
import './BaseLayout.css'
import { StepsLayout } from '../StepsLayout';
import { Nav } from '../../Components/Nav';

const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine);

    console.log('nuestra maquina', state.value, state.context);


    return (
        <div className='BaseLayout'>
            <Nav state={state} send={send}/>
            <StepsLayout state={state} send={send}/>
        </div>
    );
}
export {BaseLayout};
