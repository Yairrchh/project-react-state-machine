import React from "react";
import { PlaneIcon } from "../Icons/PlaneIcon";
import './Nav.css'

const Nav = ({state, send}) => {
    const goToWelcome = () => {
        send({ type: "CANCEL" })
    };

    return (
        <nav className="Nav">
            <div className="Nav-brand">
                <span className="Nav-icon"><PlaneIcon size={18} /></span>
                <div className="Nav-brandText">
                    <span className="Nav-eyebrow">Reserva de vuelos</span>
                    <h1 className="Nav-title">Todoticket</h1>
                </div>
            </div>
            {
                !state.matches('initial') && !state.matches('tickets') &&
                    <button onClick={goToWelcome} className="Nav-cancel">Cancelar</button>
            }
        </nav>
    )
}

export {Nav};
