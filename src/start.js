import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />; //<Welcome />;
} else {
    elem = <App />; //<img src="logo.png" alt="logo" />;
}

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
//                 name="pw"
//                 placeholder="password"
//                 type="password"
//             />
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
//                 name="pw"
//                 placeholder="password"
//                 type="password"
//             />
//             <button onClick={handleSubmit}>submit</button>
//         </div>
//     );
// }

ReactDOM.render(elem, document.querySelector("main"));
