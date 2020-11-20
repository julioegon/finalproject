import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange(e) {
        //console.log("e.target.value", e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submit() {
        console.log("about to submit!!");
        axios
            .post("/register", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.success) {
                    // then we want to redirect the user to our social network
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((e) => console.log(e));
    }

    render() {
        return (
            <div>
                <h2>All input fields must be fill to join our community</h2>

                <input
                    name="first"
                    placeholder="first name..."
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                    name="last"
                    placeholder="last name..."
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                    name="email"
                    placeholder="email..."
                    type="email"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <button
                    onClick={() => this.submit()}
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
                    Register
                </button>
                <p>
                    Already a member?{" "}
                    <Link
                        to="/login"
                        style={{
                            marginTop: "50px",
                            color: "whitesmoke",
                            fontSize: "1.5rem",
                        }}
                    >
                        Log in
                    </Link>
                </p>
            </div>
        );
    }
}
