export default function (state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS") {
        state = Object.assign({}, state, {
            friends: action.friends,
            receivedRequests: action.receivedRequests,
            sentRequests: action.sentRequests,
        });
    }

    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friends: state.friends.map((user) => {
                if (user.id == action.id) {
                    console.log("IF state ACCEPT", state);
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
            receivedRequests: state.receivedRequests.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "REMOVE_FRIEND") {
        state = {
            ...state,
            friends: state.friends.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
            receivedRequests: state.receivedRequests.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
            sentRequests: state.sentRequests.filter((user) => {
                if (user.id == action.id) {
                    return;
                } else {
                    return user;
                }
            }),
        };
    }

    // console.log("OUTSIDE IF state ACCEPT", state);

    return state;
}
