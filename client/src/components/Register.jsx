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
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password } = user;
        if (name === "" || email === "" || password === "") {
            errorToast("Fill the form properly");
            return;
        } else {
            const response = await fetch("https://pantomathism.onrender.com/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                }),
                credentials: "include"
            })
            const data = await response.json();
            if (response.status === 201 || !data) {
                navigate("/login");
            } else {
                errorToast(`${data.message}`);
            }
        }
    }
    return (
        <div className="container page">
            <form method="post" onSubmit={handleSubmit} className="register__main">
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
                        onSubmit={handleSubmit}>
                        Register
                    </button>
                    <p className="login__register">
                        Already have an account?
                        <NavLink to="/login">Login</NavLink>
                    </p>
                </div>
                <div className="register__right">
                    <img src="/favicon.png" alt="favv" draggable="false" />
                </div>
            </form>
            <ToastContainer />
        </div >
    )
}