import axios from "./axios";

export async function getFriendsList() {
    try {
        let { data } = await axios.get(`/getFriends`);
        console.log("{data in receiveFriends() action axios", data);
        return {
            type: "RECEIVE_FRIENDS",
            friends: data.rows,
            receivedRequests: data.received,
            sentRequests: data.sent,
        };
    } catch (err) {
        console.log("err in receiveFriends() action axios", err);
    }
}

export async function acceptFriend(otherId) {
    console.log("acceptFriend dispatch clicked for user id: ", otherId);
    let buttonText = "Accept Friend Request";
    try {
        let { data } = await axios.post(`/api/friendStatus/button`, {
            buttonText,
            otherId,
        });
        //console.log("{data} in acceptFriend() action axios", data);
        return {
            type: "ACCEPT_FRIEND",
            id: data.id,
        };
    } catch (err) {
        console.log("err in acceptFriend() action axios", err);
    }
}

export async function unfriend(otherId) {
    console.log("removeFriend dispatch clicked for user id: ", otherId);

    let buttonText = "Remove Friend";
    try {
        let { data } = await axios.post(`/api/friendStatus/button`, {
            buttonText,
            otherId,
        });
        return {
            type: "REMOVE_FRIEND",
            id: data.id,
        };
    } catch (err) {
        console.log("err in removeFriend() action axios", err);
    }
}

export async function chatMessages(chatMsgs) {
    return {
        type: "GET_LAST10MSGS",
        chatMessages: chatMsgs,
    };
}

export async function addNewMessage(msg) {
    return {
        type: "ADD_NEWMESSAGE",
        addNewMessage: msg,
    };
}
