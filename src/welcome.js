// src/hello-world.js
import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Logo from "./logo";
import PasswordReset from "./passwordreset";

export default function Welcome() {
    return (
        <div id="welcome" style={{ marginLeft: "600px" }}>
            <h1
                style={{
                    marginTop: "50px",

                    color: "#ffd200",
                    fontSize: "1.5rem",
                }}
            >
                Welcome to Casa de Vera Community!
            </h1>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/passwordreset" component={PasswordReset} />
                </div>
            </HashRouter>
        </div>
    );
}

// export default function Welcome() {
//     return (
//         <div>
//             <Registration />;
//         </div>
//     );
// }

// Class syntax
// class components can have "state"
// "state" is the React word for "data"
// class components can do EVERYTHING a function component can do - plus more!
// "stateful" components - which means they can do logic!
// AND they can have lifecycle methods (like componentDidMount)
// export default class HelloWorld extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             first: "Ibund",
//         };
//     }

//     componentDidMount() {
//         // componentDidMount is the React equivalent of Vue's mounted
//         // axios.get('/some-url-here-that-also-exists-in-index.js').then(resp => {
//         //     console.log(resp);
//         // we can use "this" here!!
//         // so no more var me = this; :)
//         // })
//         setTimeout(() => {
//             // we HAVE to use setState to update state in React
//             // this is literally no other way to update state in React
//             this.setState({
//                 first: "Ivana",
//             });
//         }, 1000);
//     }

//     handleClick() {
//         // axios.post('/some-req-to-server').then(() => {
//         this.setState({
//             first: "Pimentoooooooooo",
//         });
//         // })
//     }

//     render() {
//         // const { first } = this.state;
//         return (
//             <div>
//                 <p onClick={() => this.handleClick()}>Hello</p>
//                 <Greetee first={this.state.first} />
//             </div>
//         );
//     }
// }

// Function component
// function components CANNOT have state
// "presentational components" - they're good at just rendering stuff on screen
// function components are also referred to as "dumb" components. so mean :(
