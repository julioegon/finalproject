import React from 'react';

export default function Example({ first, last }) {
    console.log('Props from App', first, last, ); // agregar imgUrl
    return (
        <>
            <h2>Hi, my name is {first}{" "}{last}</h2>
            {/* <img className="small" src={imgUrl || "/img/logo.png"} /> */}
        </>
    )
}