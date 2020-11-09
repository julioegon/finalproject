import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props.match", this.props.match);
        // we'll want to use this.props.match.params.id to tell our server for which user
        // we want to get information for, our server should also check and see if we are
        // trying to access our own profile, or simply send back the id of our logged
        // in user alongside the information for the one we are currently viewing,
        // if we are viewing ourself, we should be send back to the slash route
        if (this.props.match.params.id == 7) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <>
                <h1> Hi am the OtherProfile</h1>
                <h2>
                    {" "}
                    I will eventually display other people's profiles meaning
                    their picture & bio, but I won't give other people acces to
                    edit this bio
                </h2>
            </>
        );
    }
}
