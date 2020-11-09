import React from "react";

export default function ProfilePic({
    first,
    last,
    profileimg,
    toggleUploader,
}) {
    //console.log("Props from App", first, last, profileimg); // agregar , first, last, imgUrl, toggleUploader //
    return (
        <div>
            {/* <h2>Hi, my name is {first}{" "}{last}</h2>  */}
            <img
                className="small"
                src={profileimg || "/img/logo.png"}
                onClick={() => toggleUploader("uploaderIsVisible")}
                alt={first + " " + last}
            />
        </div>
    );
}
