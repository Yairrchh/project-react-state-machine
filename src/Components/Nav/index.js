import React from "react";
import navImg from '../../assets/images/coldplay-concert-4.jpg'
import './Nav.css'

const Nav = ({state, send}) => {
    const goToWelcome = () => {
        send({ type: "CANCEL" })
    };

    return (
        <nav className="Nav">
            <figure className="figure-img"><img src={navImg} alt="img-nav"/></figure>
            <h1 className="h1-nav">Todoticket 🎫</h1>
            {
                !state.matches('initial') && !state.matches('tickets') &&
                    <button onClick={goToWelcome} className="Nav-cancel button-secondary">Cancel the purchase</button>
            }
        </nav>
    )
}

export {Nav};