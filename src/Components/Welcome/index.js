import React from "react";
import './Welcome.css'

const Welcome = ({send}) => {
    const startBooking = () => {
        send({ type: "START" });
    };

    return (
        <div className="Welcome">
            <p className="Welcome-title title">ColdPlay Tour concert</p>
            <p className="Welcome-description description">Buy your ticket and meet one of the best bands of all time. Don't miss out on your ticket for this great party!</p>
            <button onClick={startBooking} className="Welcome-start button">Start</button>
        </div>
    );
};

export {Welcome};