import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Register() {
    const [user, setUser] = useState({
        pfp: "",
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
    function handleSubmit(e) {
        e.preventDefault();

    }
    return (
        <div className="container page">
            <form className="register__main">
                <div className="register__left">
                    <h1 className="the__title">Register</h1>
                    <input onChange={handleInput} value={user.pfp} name="pfp" type="file" />
                    <input onChange={handleInput} value={user.name} name="name" type="text" placeholder="Name" />
                    <input onChange={handleInput} value={user.email} name="email" type="email" placeholder="Email" />
                    <input onChange={handleInput} value={user.password} name="password" type="password" placeholder="Password" />
                    <button type="submit" onSubmit={handleSubmit}>Register</button>
                    <p className="login__register">Already have an account? <NavLink to="/login">Login</NavLink> </p>
                </div>
                <div className="register__right">
                    <img src="/favicon.png" alt="favv" draggable="false" />
                </div>
            </form>
        </div >
    )
}