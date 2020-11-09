import axios from "axios";
import React from "react";
import Logo from "./logo";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            first: "",
            last: "",
            profileimg: "",
            uploaderIsVisible: false,
            bio: "",
        };
        this.methodInApp = this.methodInApp.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted");
        axios
            .get("/users", this.state)
            .then(({ data }) => {
                this.setState({ ...data }, () => {
                    console.log("this.state: ", this.state);
                });
            })
            .catch((error) => {
                console.log("error in axios: ", error);
            });
    }
    toggleUploader() {
        console.log("Make the uploader appear");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    methodInApp(arg) {
        console.log("running in App Component");
        this.setState({ profileimg: arg });
        this.toggleUploader("uploaderIsVisible");
        console.log("the argument I got passed was:", arg);
        console.log("this.state: ", this.toggleUploader);
    }

    addBio(arg) {
        console.log(arg);
        this.setState({ bio: arg });
    }

    render() {
        return (
            <div>
                <Logo />
                <header>
                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        profileimg={this.state.profileimg}
                        bio={this.state.bio}
                        addBio={(arg) => this.addBio(arg)}
                    />
                    <h1> Hey I am your App :D</h1>
                </header>
                <div className="main-container">
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        profileimg={this.state.profileimg}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                    )}
                    <h2 onClick={() => this.toggleUploader()}>
                        {" "}
                        Changing state with a method: toggleUploader
                        {this.state.uploaderIsVisible &&
                            "Upload your profile picture"}
                        {!this.state.uploaderIsVisible &&
                            "Thanks for joining our community"}{" "}
                    </h2>
                </div>
            </div>
        );
    }
}
