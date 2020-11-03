import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from "./welcome";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = <h1>I will be the logo component</h1>;
}

ReactDOM.render(elem, document.querySelector('main'));


