import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from "./welcome";
import logo from './logo-cdv.png';

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = <img src={logo} alt={"logo"}/>;
}

ReactDOM.render(elem, document.querySelector('main'));


