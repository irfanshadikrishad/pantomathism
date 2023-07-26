import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="container page login">
            <div className="login__main">
                <div className="login__left">
                    <img draggable="false" src="/favicon.png" alt="" />
                </div>
                <form method="post" className="login__right">
                    <h1 className="the__title">Login</h1>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        name="email"
                        type="email"
                        placeholder="Email" />
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        name="password"
                        type="password"
                        placeholder="Password" />
                    <button type="submit">Login</button>
                    <p className="login__register">Don't have an account? <NavLink to="/register">Register</NavLink> </p>
                </form>
            </div>
        </div>
    )
}