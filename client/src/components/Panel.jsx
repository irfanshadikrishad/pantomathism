import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Panel() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://pantomathism.onrender.com/panel', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: admin.email,
                password: admin.password
            }),
            credentials: "include"
        });
        const data = await response.json();

        if (response.status === 200) {
            navigate('/panel/admin');
        } else {
            errorToast(`${data.message}`);
        }
    }
    return (
        <>
            <div className="container page">
                <div className="panel__content">

                    <form onSubmit={handleSubmit} className="panel__form" method="post">
                        <img src="https://media.tenor.com/UNaQFutfOF0AAAAi/banana-crying-cat.gif" alt="banana cat" />
                        <input
                            onChange={handleInput}
                            value={admin.email}
                            name="email"
                            type="text"
                            placeholder="Email" />
                        <input
                            onChange={handleInput}
                            value={admin.password}
                            name="password"
                            type="password"
                            placeholder="Password" />
                        <button
                            onSubmit={handleSubmit}
                            type="submit">
                            Login
                        </button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}