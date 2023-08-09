import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../App";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

export default function Navbar() {
    const { state, dispatch } = useContext(LoginContext);
    const [isCategories, setIsCategories] = useState(false);
    const [isMenu, setIsMenu] = useState(false);

    useEffect(() => {
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
                dispatch({ type: "LOGIN", payload: true });
            } else {
                dispatch({ type: "LOGIN", payload: false });
            }
        }
        callUser();
    }, [state, isCategories, dispatch])
    return (
        <nav>
            <div className="container navbar">
                <NavLink to="/">
                    <h1 className="nav__logo__text">𝙋𝙖𝙣𝙩𝙤𝙢𝙖𝙩𝙝𝙞𝙨𝙢</h1>
                </NavLink>
                <div className="nav_btns">
                    {isMenu ? <div id="menuPC">
                        <NavLink to="/">Home</NavLink>
                        <button
                            onMouseEnter={() => {
                                setIsCategories(true)
                            }}
                        >Categories</button>
                        {isCategories ? <div onMouseLeave={() => {
                            setIsCategories(false)
                        }} className="nav_categories">
                            <NavLink to="/politics">Politics</NavLink>
                            <NavLink to="/history">History</NavLink>
                            <NavLink to="/religion">Religion</NavLink>
                            <NavLink to="/technology">Technology</NavLink>
                        </div> : ""}
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        {state ? <NavLink to="/profile">Profile</NavLink> : <><NavLink to="/login">Login</NavLink>
                            <NavLink className="nav__register" to="/register">Register</NavLink></>}
                    </div> : ""}

                    <div id="menuMobile">
                        {isMenu ? "" : <button
                            onClick={() => {
                                setIsMenu(true)
                            }}
                            className="nav__menu"
                            id="nav-menu-open" >
                            {<MenuIcon />}
                        </button>}
                        {isMenu ? <button
                            onClick={() => {
                                setIsMenu(false)
                                setIsCategories(false)
                            }}
                            className="nav__menu"
                            id="nav-menu-close" >
                            {<ClearIcon />}
                        </button> : ""}
                    </div>

                </div>
            </div>
        </nav >
    )
}