import React from 'react';
import { getAirportCode } from '../../Utils/api';
import { PlaneIcon } from '../Icons/PlaneIcon';
import './FlightProgress.css';

const STEP_LABELS = ['Elige tu vuelo', 'Elige tu destino', 'Agrega pasajeros', 'Tu boleto'];

const FlightProgress = ({ state }) => {
    const stepIndex = state.matches('initial') ? 0
        : state.matches('search') ? 1
        : state.matches('passengers') ? 2
        : 3;

    const percent = (stepIndex / (STEP_LABELS.length - 1)) * 100;
    const destinationCode = state.context.selectedCountry ? getAirportCode(state.context.selectedCountry) : '···';

    return (
        <div className="FlightProgress">
            <div className="FlightProgress-row">
                <div className="FlightProgress-node">
                    <span className="FlightProgress-dot FlightProgress-dot--filled" />
                    <span className="FlightProgress-code">AQUÍ</span>
                </div>
                <div className="FlightProgress-track">
                    <span className="FlightProgress-trackFill" style={{ width: `${percent}%` }} />
                    <span className="FlightProgress-plane" style={{ left: `${percent}%` }}>
                        <PlaneIcon size={16} />
                    </span>
                </div>
                <div className="FlightProgress-node">
                    <span className={`FlightProgress-dot ${destinationCode !== '···' ? 'FlightProgress-dot--filled' : ''}`} />
                    <span className="FlightProgress-code">{destinationCode}</span>
                </div>
            </div>
            <p className="FlightProgress-label">{STEP_LABELS[stepIndex]}</p>
        </div>
    );
};

export { FlightProgress };
