import React from "react";
import BioEditor from "./BioEditor";
import ProfilePic from "./profilepic";

export default function Profile(props) {
    console.log("props: ", props);
    return (
        <div>
            <h1>PROFILE COMPONENT</h1>
            {/* <span>
                Hello there {first} {last}
            </span> */}
            <ProfilePic
                profileimg={props.profileimg}
                first={props.first}
                last={props.last}
            />
            <br />
            <p>{props.bio}</p>
            <br />
            <BioEditor
                bio={props.bio}
                id={props.id}
                addBio={(arg) => props.addBio(arg)}
            />
        </div>
    );
}
