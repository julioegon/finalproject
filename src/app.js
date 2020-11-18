import axios from "axios";
import React from "react";
import Logo from "./logo";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import LogOut from "./logout";
import Chat from "./Chat";
import Friends from "./friends";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
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
            .get("/user", this.state)
            .then(({ data }) => {
                console.log("data: ", data);
                this.setState({ ...data }, () => {
                    console.log("this.state: ", this.state);
                });
            })
            .catch((err) => {
                console.log("error in axios: ", err);
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
        console.log("addBio in App", arg);
        this.setState({ bio: arg });
    }

    logOut() {
        // console.log("logout clicked");
        axios.get("/api/logout").then(() => {
            location.replace("/welcome#/login");
        });
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Logo />
                    <Link
                        to="/friends"
                        style={{
                            marginTop: "5px",
                            color: "whitesmoke",
                            fontSize: "1.5rem",
                        }}
                    >
                        Friends
                    </Link>
                    {/* <Route path="/logo-display" component={Logo} /> */}
                    <header>
                        {/* <Profile
                            first={this.state.first}
                            last={this.state.last}
                            profileimg={this.state.profileimg}
                            bio={this.state.bio}
                            addBio={(arg) => this.addBio(arg)}
                            toggleUploader={this.toggleUploader}
                        /> */}
                        <h1> Hey I am your App :D</h1>
                    </header>
                    <div className="main-container">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    profileimg={this.state.profileimg}
                                    bio={this.state.bio}
                                    addBio={(arg) => this.addBio(arg)}
                                    toggleUploader={this.toggleUploader}
                                    id={this.state.id}
                                />
                            )}
                        />

                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
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
                        <Route path="/" render={() => <FindPeople />} />
                    </div>
                    <Route path="/friends" component={Friends} />
                    <Route path="/chat" component={Chat} />
                    <LogOut logoutButton={() => this.logOut()} />
                </BrowserRouter>
            </div>
        );
    }
}
