import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            bioDraft: "",
        };

        this.textAreaToggle = this.textAreaToggle.bind(this);
    }

    textAreaToggle(e) {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
            bioDraft: this.props.bio,
        });
    }

    handleChange(e) {
        console.log("bioDraft: ", this.state.bioDraft);
        this.setState(
            {
                bioDraft: e.target.value,
            },
            () => {
                console.log("this.state: ", this.state);
            }
        );
    }

    addBioInApp(arg) {
        console.log("console.log in addBio", arg);
        arg = this.state.bioDraft;
        this.props.addBio(arg);
    }

    submitBio() {
        console.log("about to submit!!!", this.state);
        axios
            .post("/bioeditor", { bio: this.state.bioDraft, id: this.props.id })
            .then((response) => {
                console.log(this.state.bioDraft);
                this.setState({
                    bioDraft: this.state.bioDraft,
                });
                this.addBioInApp(this.state.bioDraft);
                this.textAreaToggle();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <>
                <h1></h1>
                {this.state.editorIsVisible && (
                    <div>
                        <textarea
                            id="textarea"
                            name="bio"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.bioDraft}
                            className={"bio-textarea"}
                        />
                    </div>
                )}
                {this.props.bio && !this.state.editorIsVisible && (
                    <button
                        onClick={() => this.textAreaToggle()}
                        className="input-registration"
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
                        Edit bio!
                    </button>
                )}
                {!this.props.bio && !this.state.editorIsVisible && (
                    <button
                        onClick={this.textAreaToggle}
                        className="input-registration"
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
                        Add bio!
                    </button>
                )}
                {this.state.editorIsVisible && (
                    <button
                        onClick={() => this.submitBio()}
                        className="input-registration"
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
                        Submit bio!
                    </button>
                )}
            </>
        );
    }
}
