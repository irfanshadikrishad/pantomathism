import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Logout() {
    const navigate = useNavigate();
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
    const callLogout = async () => {
        fetch('http://localhost:3001/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => {
            const data = res.json();
            if (res.status === 200) {
                navigate('/');
            } else {
                errorToast(data.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        callLogout();
    })
    return (
        <>
            <div className="container page">
                <h1>Logging Out ...</h1>
                <ToastContainer/>
            </div>
        </>
    )
}