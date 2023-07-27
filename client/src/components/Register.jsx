import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    function handleInput(e) {
        const { name, value } = e.target;
        setUser({
            ...user, [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    return (
        <div className="container page">
            <form method="post" className="register__main">
                <div className="register__left">
                    <h1 className="the__title">Register</h1>
                    <input onChange={handleInput}
                        value={user.name}
                        name="name"
                        type="text"
                        placeholder="Name" />
                    <input onChange={handleInput}
                        value={user.email}
                        name="email"
                        type="email"
                        placeholder="Email" />
                    <input onChange={handleInput}
                        value={user.password}
                        name="password"
                        type="password"
                        placeholder="Password" />
                    <button
                        type="submit"
                        onSubmit={handleSubmit}>Register</button>
                    <p className="login__register">Already have an account? <NavLink to="/login">Login</NavLink> </p>
                </div>
                <div className="register__right">
                    <img src="/favicon.png" alt="favv" draggable="false" />
                </div>
            </form>
            <ToastContainer />
        </div >
    )
}