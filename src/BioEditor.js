import React, { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
        };

        this.textAreaToggle = this.textAreaToggle.bind(this);
    }
    textAreaToggle() {
        console.log("Bla Bla Bla");
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
        });
    }

    render() {
        return (
            <>
                <h1>Bio Editor</h1>!{this.state.editorIsVisible && <textarea />}
                <button onClick={this.textAreaToggle}>Add Bio</button>
            </>
        );
    }
}
