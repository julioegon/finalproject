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
            <div className="main-container">
                <BrowserRouter>
                    <div className="header-container">
                        <header>
                            <Logo />
                            <Link to="/">
                                <h1
                                    style={{
                                        marginTop: "50px",
                                        color: "#ffd200",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {" "}
                                    Casa de Vera Community
                                </h1>
                            </Link>
                            <Link
                                to="/friends"
                                style={{
                                    marginTop: "50px",
                                    color: "whitesmoke",
                                    fontSize: "1.5rem",
                                }}
                            >
                                Friends
                            </Link>
                            <br></br>
                            <Link
                                to="/chat"
                                style={{
                                    marginTop: "50px",
                                    color: "whitesmoke",
                                    fontSize: "1.5rem",
                                }}
                            >
                                Chat
                            </Link>
                            <br></br>
                            <Link
                                to="/FindPeople"
                                style={{
                                    marginTop: "50px",
                                    color: "whitesmoke",
                                    fontSize: "1.5rem",
                                }}
                            >
                                Find People
                            </Link>
                            <LogOut logoutButton={() => this.logOut()} />
                            {/* <Route path="/logo-display" component={Logo} /> */}
                            {/* <Profile
                            first={this.state.first}
                            last={this.state.last}
                            profileimg={this.state.profileimg}
                            bio={this.state.bio}
                            addBio={(arg) => this.addBio(arg)}
                            toggleUploader={this.toggleUploader}
                        /> */}
                            <ProfilePic
                                first={this.state.first}
                                last={this.state.last}
                                profileimg={this.state.profileimg}
                                toggleUploader={() => this.toggleUploader()}
                            />
                            {this.state.uploaderIsVisible && (
                                <Uploader methodInApp={this.methodInApp} />
                            )}
                            {/* <h2 onClick={() => this.toggleUploader()}>
                                {" "}
                                {/* Aqui puedo escribir algo */}
                            {this.state.uploaderIsVisible && ""}
                            {!this.state.uploaderIsVisible && ""} {/* </h2> */}
                        </header>
                    </div>
                    <br></br>
                    <div
                        style={{
                            marginTop: "200px",
                        }}
                    >
                        <Route path="/chat" component={Chat} />
                    </div>
                    <div>
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
                        {/* <ProfilePic
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
                        </h2> */}
                        <div>
                            <Route path="/friends" component={Friends} />
                        </div>
                        <br></br>
                        <div>
                            <Route path="/" render={() => <FindPeople />} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
