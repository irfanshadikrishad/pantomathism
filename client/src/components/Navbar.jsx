import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isCategories, setIsCategories] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    function categories() {
        setIsCategories(!isCategories);
    }
    const callUser = async () => {
        const res = await fetch('http://localhost:3001/data', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();
        if (res.status === 200 && data._id) {
            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        callUser();
    }, [])
    return (
        <nav>
            <div className="container navbar">
                <NavLink to="/"><img className="nav__logo" draggable='false' src="favicon.png" alt="" /></NavLink>
                <div className="nav_btns">
                    <NavLink to="/">Home</NavLink>
                    <button onClick={categories}>Categories</button>
                    {isCategories ? <div className="nav_categories">
                        <NavLink to="/politics">Politics</NavLink>
                        <NavLink to="/history">History</NavLink>
                        <NavLink to="/religion">Religion</NavLink>
                        <NavLink to="/technology">Technology</NavLink>
                    </div> : ""}
                    <NavLink to="/about">About</NavLink>
                    {isLoggedIn ? <NavLink to="/profile">Profile</NavLink> : <><NavLink to="/login">Login</NavLink>
                        <NavLink className="nav__register" to="/register">Register</NavLink></>}

                </div>
            </div>
        </nav>
    )
}