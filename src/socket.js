// src/socket.js
import * as io from "socket.io-client";
import { chatMessages, addNewMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    socket.on("chatHistory", (chatMsgs) => {
        console.log("last ten chat msgs:", chatMsgs);
        store.dispatch(chatMessages(chatMsgs));
        // what you want to do with this
        // once it logs the actual chat history is dispatch an action the then
        // adds the history to redux global state
    });

    socket.on("newMsgToAddToHistory", (msg) => {
        console.log("new msg to add to chat", msg);
        store.dispatch(addNewMessage(msg));
        // this will eventually be a new
        // msg object, need to dispatch an action to add the object
        // to redux global state
    });
};
