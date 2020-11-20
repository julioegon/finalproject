import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class PasswordReset extends React.Component {
    constructor() {
        super();
        this.state = {
            resetPassword: 0,
            errorMessage: null,
        };
    }

    getCurrentDisplay() {
        if (this.state.resetPassword == 0) {
            return (
                <>
                    <h2>Please enter your email address:</h2>
                    <input
                        name="email"
                        placeholder="email..."
                        onChange={(e) => this.handleChange(e)}
                        className="input-registration"
                        type="email"
                    ></input>
                    <button
                        style={{
                            font: "whitesmoke",
                            background: "none",
                            border: "none",
                            color: "inherit",
                            padding: "0",
                            cursor: "pointer",
                            // marginTop: "5px",
                            fontSize: "1.0rem",
                            color: "white",
                            width: "100px",
                            height: "20px",
                            margin: "0",
                            backgroundImage:
                                "linear-gradient(to top, #736b5e, #aba499)",
                        }}
                        className="input-registration"
                        onClick={() => this.submit("/password/reset/start")}
                    >
                        Submit
                    </button>
                </>
            );
        } else if (this.state.resetPassword == 1) {
            return (
                <>
                    <h2>
                        Please enter the code you received in your inbox if not
                        check your spam:
                    </h2>
                    <input
                        name="code"
                        placeholder="code..."
                        onChange={(e) => this.handleChange(e)}
                        className="input-registration"
                        style={{
                            marginBottom: "0",
                        }}
                    ></input>

                    <h2>Please enter a new password:</h2>
                    <input
                        name="password"
                        placeholder="password..."
                        onChange={(e) => this.handleChange(e)}
                        className="input-registration"
                        type="password"
                    ></input>

                    <button
                        className="input-registration"
                        onClick={() => this.submit("/password/reset/verify")}
                        style={{
                            font: "whitesmoke",
                            background: "none",
                            border: "none",
                            color: "inherit",
                            padding: "0",
                            cursor: "pointer",
                            // marginTop: "5px",
                            fontSize: "1.0rem",
                            color: "white",
                            width: "100px",
                            height: "20px",
                            margin: "0",
                            backgroundImage:
                                "linear-gradient(to top, #736b5e, #aba499)",
                        }}
                    >
                        Submit
                    </button>
                </>
            );
        } else if (this.state.resetPassword == 2) {
            return (
                <>
                    <h2>Success!</h2>
                    <p>
                        You can now{" "}
                        <Link
                            to="/login"
                            style={{
                                marginTop: "50px",
                                color: "whitesmoke",
                                fontSize: "1.5rem",
                            }}
                        >
                            sign in
                        </Link>{" "}
                        with your new password.
                    </p>
                </>
            );
        }
    }

    handleChange(e) {
        console.log("e.target.value: ", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );
    }

    submit(path) {
        console.log(path);
        axios
            .post(`${path}`, this.state)
            .then((response) => {
                console.log("response", response.data);
                if (response.data.success) {
                    this.setState({
                        resetPassword: this.state.resetPassword + 1,
                        errorMessage: null,
                    });
                } else {
                    this.setState({
                        errorMessage: response.data.errorMessage,
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="flex-col registration-div">
                <h1>Reset your password:</h1>
                {this.state.errorMessage && (
                    <div className="error">{this.state.errorMessage}</div>
                )}
                {this.getCurrentDisplay()}
                <p>
                    Not registered yet?{" "}
                    <Link
                        to="/"
                        style={{
                            marginTop: "50px",
                            color: "whitesmoke",
                            fontSize: "1.5rem",
                        }}
                    >
                        Register
                    </Link>
                </p>
            </div>
        );
    }
}
