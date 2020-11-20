import React from "react";
// import { Link } from "react-router-dom";

export default function LogOut({ logoutButton }) {
    return (
        <div style={{ marginTop: "10px" }}>
            <button
                onClick={logoutButton}
                className="logout-button"
                style={{
                    font: "whitesmoke",
                    background: "white",
                    border: "none",
                    padding: "0",
                    cursor: "pointer",
                    // marginTop: "5px",
                    fontSize: "1.0rem",
                    color: "black",
                    width: "100px",
                    height: "20px",
                    margin: "0",
                    // backgroundImage:
                    //     "linear-gradient(to top, #736b5e, #aba499)",
                }}
            >
                Log out
            </button>
        </div>
    );
}
