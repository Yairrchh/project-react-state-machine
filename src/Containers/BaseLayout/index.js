import React from 'react';
import { useMachine } from '@xstate/react';
import {bookingMachine} from '../../Machines/bookingMachine';
import './BaseLayout.css'
import { StepsLayout } from '../StepsLayout';
import { Nav } from '../../Components/Nav';
import { FlightProgress } from '../../Components/FlightProgress';
import { SkyScene } from '../../Components/SkyScene';

const BaseLayout = () => {
    const [state, send] = useMachine(bookingMachine);

    return (
        <div className='BaseLayout'>
            <SkyScene />
            <div className='BaseLayout-ticket'>
                <Nav state={state} send={send}/>
                <FlightProgress state={state}/>
                <StepsLayout state={state} send={send}/>
            </div>
        </div>
    );
}
export {BaseLayout};
