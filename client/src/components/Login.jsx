import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../App";

export default function Login() {
    const { dispatch } = useContext(LoginContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function errorToast(error) {
        toast.error(`${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            errorToast("Fill the form properly.");
        } else {
            const response = await fetch("https://pantomathism.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                }),
                credentials: "include"
            })
            const data = await response.json();
            if (response.status === 200) {
                dispatch({ type: "LOGIN", payload: true });
                navigate('/');
            } else {
                errorToast(`${data.message}`);
            }
        }
    }

    return (
        <div className="container page login">
            <div className="login__main">
                <div className="login__left">
                    <img draggable="false" src="/favicon.png" alt="" />
                </div>
                <form onSubmit={handleSubmit} method="post" className="login__right">
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
                    <button onSubmit={handleSubmit} type="submit">Login</button>
                    <p className="login__register">
                        Don't have an account?
                        <NavLink to="/register">Register</NavLink>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}