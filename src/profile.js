import React from "react";
import BioEditor from "./BioEditor";
import ProfilePic from "./profilepic";

export default function Profile(first, last, profileimg, bio, id) {
    console.log("first, last: ", first, last, profileimg, bio, id); //imgUrl
    return (
        <div>
            <h1>PROFILE COMPONENT</h1>
            {/* <span>
                Hello there {first} {last}
            </span> */}
            <ProfilePic profileimg={profileimg} first={first} last={last} />
            <BioEditor bio={bio} id={id} addBio={(arg) => this.addBio(arg)} />
        </div>
    );
}
