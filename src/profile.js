import React from "react";
import BioEditor from "./BioEditor";
import ProfilePic from "./profilepic";

export default function Profile(props) {
    console.log("props: ", props);
    return (
        <div
            style={{
                marginTop: "200px",
                color: "whitesmoke",
                fontSize: "1.5rem",
            }}
        >
            <h1></h1>

            <ProfilePic
                profileimg={props.profileimg}
                first={props.first}
                last={props.last}
            />
            <br></br>
            <span
                style={{
                    marginTop: "5px",
                    color: "whitesmoke",
                    fontSize: "1.5rem",
                }}
            >
                {props.first} {props.last}
            </span>
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
