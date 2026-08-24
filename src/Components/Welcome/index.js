import React from "react";
import './Welcome.css'

const Welcome = ({send}) => {
    const startBooking = () => {
        send({ type: "START" });
    };

    return (
        <div className="Welcome">
            <h2 className="Welcome-title">Tu próximo destino está a un boleto de distancia</h2>
            <p className="Welcome-description">Elige entre 14 destinos en América, agrega a tus acompañantes y recibe tu boleto al instante.</p>
            <p className="Welcome-fare">Vuelos desde <span>$120</span></p>
            <button onClick={startBooking} className="Welcome-start btn-primary">Buscar vuelos</button>
        </div>
    );
};

export {Welcome};
