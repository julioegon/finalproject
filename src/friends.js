import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList, acceptFriend, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    let friends = useSelector(
        (state) =>
            state.friends &&
            state.friends.filter((user) => user.accepted == true)
    );
    let wannabes = useSelector(
        (state) =>
            state.receivedRequests &&
            state.receivedRequests.filter((user) => user) // == false
    );

    let sentRequests = useSelector(
        (state) =>
            state.sentRequests && state.sentRequests.filter((user) => user)
    );

    useEffect(() => {
        dispatch(getFriendsList());
    }, []);

    if (!friends) {
        return null;
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}> Friends requests: </h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                }}
            >
                {wannabes &&
                    wannabes.map((user) => (
                        <div
                            key={user.id}
                            className="section"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "110px",
                                // height: "190px",
                            }}
                        >
                            <Link
                                to={`/user/${user.id}`}
                                style={{
                                    textDecoration: "none",
                                    textAlign: "center",
                                }}
                            >
                                <img src={user.profileimg || "logo.png"} />
                                <br />
                                <p
                                    style={{
                                        marginTop: "5px",
                                        color: "whitesmoke",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {user.first} {user.last}
                                </p>
                            </Link>
                            <button
                                style={{
                                    font: "whitesmoke",
                                    background: "none",
                                    border: "none",
                                    color: "inherit",
                                    padding: "0",
                                    cursor: "pointer",
                                    // marginTop: "5px",
                                    fontSize: "1.0rem",
                                    color: "white",
                                    width: "100px",
                                    height: "20px",
                                    margin: "0",
                                    backgroundImage:
                                        "linear-gradient(to top, #736b5e, #aba499)",
                                }}
                                className="input-registration"
                                onClick={() => dispatch(acceptFriend(user.id))}
                            >
                                Accept
                            </button>
                            <br></br>
                            <button
                                style={{
                                    font: "whitesmoke",
                                    background: "none",
                                    border: "none",
                                    color: "inherit",
                                    padding: "0",
                                    cursor: "pointer",
                                    // marginTop: "5px",
                                    fontSize: "1.0rem",
                                    color: "white",
                                    width: "100px",
                                    height: "20px",
                                    margin: "0",
                                    backgroundImage:
                                        "linear-gradient(to top, #736b5e, #aba499)",
                                }}
                                className="input-registration"
                                onClick={() => dispatch(unfriend(user.id))}
                            >
                                Reject
                            </button>
                        </div>
                    ))}
            </div>

            <h1 style={{ textAlign: "center" }}> Sent requests: </h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                }}
            >
                {sentRequests &&
                    sentRequests.map((user) => (
                        <div
                            key={user.id}
                            className="section"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "110px",
                                // minHeight: "220px",
                            }}
                        >
                            <Link
                                to={`/user/${user.id}`}
                                style={{
                                    textDecoration: "none",
                                    textAlign: "center",
                                }}
                            >
                                <img src={user.profileimg || "/logo.png"} />
                                <br />
                                <p
                                    style={{
                                        marginTop: "5px",
                                        color: "whitesmoke",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {user.first} {user.last}
                                </p>
                            </Link>
                            <button
                                style={{
                                    font: "whitesmoke",
                                    background: "none",
                                    border: "none",
                                    color: "inherit",
                                    padding: "0",
                                    cursor: "pointer",
                                    // marginTop: "5px",
                                    fontSize: "1.0rem",
                                    color: "white",
                                    width: "100px",
                                    height: "20px",
                                    margin: "0",
                                    backgroundImage:
                                        "linear-gradient(to top, #736b5e, #aba499)",
                                }}
                                className="input-registration"
                                onClick={() => dispatch(unfriend(user.id))}
                            >
                                Cancel
                            </button>
                        </div>
                    ))}
            </div>

            {friends && <h1 style={{ textAlign: "center" }}> Friends: </h1>}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                }}
            >
                {friends &&
                    friends.map((user) => (
                        <div
                            key={user.id}
                            className="section"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                // alignSelf: "center",
                                width: "110px",
                                // height: "190px",
                            }}
                        >
                            <Link
                                to={`/user/${user.id}`}
                                style={{
                                    textDecoration: "none",
                                    textAlign: "center",
                                }}
                            >
                                <img src={user.profileimg || "/logo.png"} />
                                <br />
                                <p
                                    style={{
                                        marginTop: "5px",
                                        color: "whitesmoke",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    {user.first} {user.last}
                                </p>
                            </Link>
                            <button
                                style={{
                                    font: "whitesmoke",
                                    background: "none",
                                    border: "none",
                                    color: "inherit",
                                    padding: "0",
                                    cursor: "pointer",
                                    // marginTop: "5px",
                                    fontSize: "1.0rem",
                                    color: "white",
                                    width: "100px",
                                    height: "20px",
                                    margin: "0",
                                    backgroundImage:
                                        "linear-gradient(to top, #736b5e, #aba499)",
                                }}
                                className="input-registration"
                                onClick={() => dispatch(unfriend(user.id))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );
}
