import React from "react";
import axios from "./axios";
import FriendButton from "./FriendButton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (
                    !data.success ||
                    this.props.match.params.id == data.userId
                ) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: data.rows.first,
                        last: data.rows.last,
                        profileimg: data.rows.profileimg,
                        bio: data.rows.bio,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios OtherProfile component", err);
            });
    }

    render() {
        return (
            <div id="other-profile">
                {!this.state.error && (
                    <img
                        className="profile-image"
                        src={this.state.profileimg || "/logo.png"}
                    />
                )}
                <h1 id="other-name">
                    {this.state.first} {this.state.last}
                </h1>
                <div id="other-bio">
                    {this.state.bio && (
                        <div id="bio-text">{this.state.bio}</div>
                    )}
                    <div>
                        <FriendButton otherId={this.props.match.params.id} />
                    </div>
                </div>
            </div>
        );
    }
}
