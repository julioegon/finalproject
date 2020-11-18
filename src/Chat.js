import React, { useEffect, useRef } from "react";
import { socket } from "./socket";

import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMessages", chatMessages); // for now this will always log undefined,
    // you will need to create a chat table, add a bit of dummy data, complete
    // the socket connection stuff, dispatch an action and put the chat history in
    // redux global state and THEN this const will have actual value
    const elemRef = useRef();

    useEffect(() => {
        console.log("chat just mounted");
        // console.log("elemRef", elemRef);
        // console.log("scroll top:", elemRef.current.scrollTop);
        // console.log("clientHeigth", elemRef.current.clientHeight);
        // console.log("scrollHeight", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            console.log("user want to send message");
            e.preventDefault();
            socket.emit("My amazing new msg", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            <h1>Welcome to Chat</h1>
            <div className="chat-display-container">
                <p>Chat messages will go here (This is hardcode)</p>
                <p>Chat messages will go here (This is hardcode)</p>
            </div>
            <textarea onKeyDown={keyCheck} placeholder="Write message here!" />
        </>
    );
}
