import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
        };

        this.textAreaToggle = this.textAreaToggle.bind(this);
    }
    //     textAreaToggle() {
    //         console.log("Bla Bla Bla");
    //         this.setState({
    //             editorIsVisible: !this.state.editorIsVisible,
    //         });
    //     }

    //     render() {
    //         return (
    //             <>
    //                 <h1>Bio Editor</h1>!{this.state.editorIsVisible && <textarea />}
    //                 <button onClick={this.textAreaToggle}>Add Bio</button>
    //             </>
    //         );
    //     }
    // }

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
        this.props.addBio(arg);
    }

    submitBio() {
        console.log("about to submit!!!", this.state);
        axios
            .post("/bioeditor", { bio: this.state.bioDraft, id: this.props.id }) // { bio: this.state.bioDraft, id: this.props.id }
            .then((response) => {
                console.log(response.data);
                this.setState({
                    bioDraft: response.data.bio,
                });
                this.addBioInApp(response.data.bio);
                this.textAreaToggle();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <>
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
                            backgroundColor: "black",
                            color: "white",
                            width: "130px",
                            margin: "10px auto",
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
                            backgroundColor: "black",
                            color: "white",
                            width: "130px",
                            margin: "10px auto",
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
                            backgroundColor: "black",
                            color: "white",
                            width: "130px",
                            margin: "10px auto",
                        }}
                    >
                        Submit bio!
                    </button>
                )}
            </>
        );
    }
}
