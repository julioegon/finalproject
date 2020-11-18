import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherId }) {
    const [buttonText, setButtonText] = useState("");
    // console.log("props in Friend Button", otherId);

    useEffect(() => {
        // console.log("useEffect in FriendButton is running");
        (async () => {
            try {
                let { data } = await axios.get(`/api/friendStatus/${otherId}`);
                setButtonText(data.status);
            } catch (err) {
                console.log("err in useEffect axios in FriendButton", err);
            }
        })();
    }, []);

    function submit() {
        // console.log("FriendButton clicked");
        (async () => {
            try {
                let { data } = await axios.post(`/api/friendStatus/button`, {
                    buttonText,
                    otherId,
                });
                setButtonText(data.status);
            } catch (err) {
                console.log("err in submit() axios in FriendButton", err);
            }
        })();
    }

    return (
        <>
            <button
                onClick={() => submit()}
                id="friend-button"
                className="button"
            >
                {buttonText}
            </button>
        </>
    );
}
