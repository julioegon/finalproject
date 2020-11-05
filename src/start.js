import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from "./welcome";
import App from "./app";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;  //<Welcome />;
} else {
    elem = <App />; //<img src="logo.png" alt="logo" />;
}

ReactDOM.render(elem, document.querySelector('main'));


