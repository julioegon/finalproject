import React from 'react';
import axios from 'axios';

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
        
    }

    handleChange(e) {
        //console.log("e.target.value", e.target.value);
        this.setState({
            [e.target.name] : e.target.value,
        });
    }

    submit() {
        console.log("about to submit!!");
        axios
            .post("/register", this.state)
            .then((response) => {
                console.log("response", response);
                if (response.data.succes) {
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
                <form>
                    <h2>I am the Registration Component!</h2>
                    <input name ="first" placeholder="first name..." onChange={(e) => this.handleChange(e)}></input>
                    <input name ="last" placeholder="last name..." onChange={(e) => this.handleChange(e)}></input>
                    <input name ="email" placeholder="email..." onChange={(e) => this.handleChange(e)}></input>
                    <input name ="password" placeholder="password" type="password" onChange={(e) => this.handleChange(e)}></input>
                    <button onClick={() => this.submit()}>Register</button>
                </form>
            </div>
        );
    }
}