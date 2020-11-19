import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";
// import { useStatefulFields } from "./hooks/useStatefulFields";
// import { useAuthSubmit } from "./hooks/useAuthSubmit";
import { init } from "./socket";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

// check if it is !userIsLoggedIn

if (!userIsLoggedIn) {
    elem = <Welcome />; //<Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));

// ReactDOM.render(
//     <>
//         <Login />
//         <Register />
//         <App />
//     </>,
//     document.querySelector("main")
// );

// function Login() {
//     const [values, handleChange] = useStatefulFields();
//     const [error, handleSubmit] = useAuthSubmit("/login", values);

//     return (
//         <div>
//             <h2>Login</h2>
//             {error && <div>Oops! Something went wrong.</div>}
//             <input onChange={handleChange} name="email" placeholder="email" />
//             <input
//                 onChange={handleChange}
//                 name="password"
//                 placeholder="password"
//                 type="password"
//             />
//             <input type="hidden" name="_csrf" value="{{csrfToken}}"></input>
//             <button onClick={handleSubmit}>submit</button>
//         </div>
//     );
// }

// function Register() {
//     const [values, handleChange] = useStatefulFields();
//     const [error, handleSubmit] = useAuthSubmit("/register", values);

//     return (
//         <div>
//             <h2>Register</h2>

//             {error && <div>Oops! Something went wrong.</div>}
//             <input
//                 onChange={handleChange}
//                 name="first"
//                 placeholder="first name"
//             />
//             <input
//                 onChange={handleChange}
//                 name="last"
//                 placeholder="last name"
//             />
//             <input onChange={handleChange} name="email" placeholder="email" />
//             <input
//                 onChange={handleChange}
//                 name="password"
//                 placeholder="password"
//                 type="password"
//             />
//             <input type="hidden" name="_csrf" value="{{csrfToken}}"></input>
//             <button onClick={handleSubmit}>submit</button>
//         </div>
//     );
// }
