import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => state.chatMessages);
    console.log("chat messages: ", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        // console.log("key pressed", e.target.value);
        if (e.key === "Enter") {
            console.log("user wants to send mesage");
            e.preventDefault();
            console.log("message typed and sent: ", e.target.value);
            socket.emit("My amazing new msg", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <>
            <div id="chat-container">
                <div id="chat-heading">
                    <h2>Chat</h2>
                </div>
                <div className="chat-display-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map((chat) => (
                            <div
                                key={chat.chat_id}
                                id="chat-component-container"
                            >
                                <Link to={`/user/${chat.sender_id}`}>
                                    <div id="chat-image-container">
                                        <img
                                            className="chat-image"
                                            src={chat.profileimg || "/logo.png"}
                                        />
                                    </div>
                                </Link>
                                <div id="chat-text">
                                    <Link
                                        to={`/user/${chat.sender_id}`}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <p id="chat-name">{chat.first}</p>
                                    </Link>
                                    <p id="chat-msg">{chat.message}</p>
                                    <p id="chat-timestamp">
                                        <div>
                                            {chat.timestamp.slice(11, 16)}
                                        </div>
                                        <div>
                                            {chat.timestamp.split("T")[0]}
                                        </div>
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                <div id="chat-textarea">
                    <textarea
                        onKeyDown={keyCheck}
                        placeholder="Type your message here"
                        id="bio-textarea"
                        rows="2"
                        cols="40"
                        maxLength="255"
                        style={{
                            marginTop: "10px",
                        }}
                    ></textarea>
                </div>
            </div>
        </>
    );
}

// import React, { useEffect, useRef } from "react";
// import { socket } from "./socket";

// import { useSelector } from "react-redux";

// export default function Chat() {
//     const chatMessages = useSelector((state) => state && state.chatMessages);
//     console.log("chatMessages", chatMessages); // for now this will always log undefined,
//     // you will need to create a chat table, add a bit of dummy data, complete
//     // the socket connection stuff, dispatch an action and put the chat history in
//     // redux global state and THEN this const will have actual value
//     const elemRef = useRef();

//     useEffect(() => {
//         console.log("chat just mounted");
//         // console.log("elemRef", elemRef);
//         // console.log("scroll top:", elemRef.current.scrollTop);
//         // console.log("clientHeigth", elemRef.current.clientHeight);
//         //console.log("scrollHeight", elemRef.current.scrollHeight);
//         elemRef.current.scrollTop =
//             elemRef.current.scrollHeight - elemRef.current.clientHeight;
//     }, [chatMessages]);

//     const keyCheck = (e) => {
//         if (e.key === "Enter") {
//             console.log("user want to send message");
//             e.preventDefault();
//             socket.emit("My amazing new msg", e.target.value);
//             e.target.value = "";
//         }
//     };
//     return (
//         <>
//             <h1>Welcome to Chat</h1>
//             <div className="chat-display-container">
//                 <p>Chat messages will go here (This is hardcode)</p>
//                 <p>Chat messages will go here (This is hardcode)</p>
//             </div>
//             <textarea onKeyDown={keyCheck} placeholder="Write message here!" />
//         </>
//     );
// }
