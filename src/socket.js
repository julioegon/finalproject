// src/socket.js
import * as io from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    socket.on("chatHistory", (chatMsgs) => {
        console.log("last ten chat msgs:", chatMsgs); // what you want to do with this
        // once it logs the actual chat history is dispatch an action the then
        // adds the history to redux global state
    });

    socket.on("newMsgToAddToHistory", (msg) => {
        console.log("new msg to add to chat", msg); // this will eventually be a new
        // msg object, need to dispatch an action to add the object
        // to redux global state
    });
};

// export const init = (store) => {
//     if (!socket) {
//         socket = io.connect();
//         // receiving a message from server
//         socket.on("welcome", (msg) => {
//             //console.log("hopefully we see this :)", msg);
//         });
//         socket.on("messageSentWithIoEmit", (payload) => {
//             //console.log("payload from messageSentWithIoEmit", payload);
//         });

//         // sending message from client to server
//         socket.emit("messageFromClient", [1, 2, 3]);

//         socket.on("broadcastEmitFun", (data) => {
//             console.log("data from broadcastEmitFun: ", data);
//         });
//     }
// };
