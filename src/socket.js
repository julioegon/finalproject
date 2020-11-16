// src/socket.js
import * as io from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        // receiving a message from server
        socket.on("welcome", (msg) => {
            //console.log("hopefully we see this :)", msg);
        });
        socket.on("messageSentWithIoEmit", (payload) => {
            //console.log("payload from messageSentWithIoEmit", payload);
        });

        // sending message from client to server
        socket.emit("messageFromClient", [1, 2, 3]);

        socket.on("broadcastEmitFun", (data) => {
            console.log("data from broadcastEmitFun: ", data);
        });
    }
};
