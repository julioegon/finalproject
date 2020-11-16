import React from "react";
import { Link } from "react-router-dom";

export default function LogOut({ logoutButton }) {
    return (
        <div>
            <button onClick={logoutButton} className="logout-button">
                Log out
            </button>
        </div>
    );
}
