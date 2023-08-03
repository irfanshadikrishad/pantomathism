import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function AdminCard(props) {
    function successToast(tweet) {
        toast.success(`${tweet}`, {
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
        const response = await fetch('http://localhost:3001/user/delete', {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.id
            }),
            credentials: "include"
        })
        const data = await response.json();
        if (response.status === 200) {
            successToast(data.message);
        } else {
            errorToast(data.message);
        }
    }
    return (
        <>
            <form method="delete" onSubmit={handleSubmit} className="card" key={props.id}>
                <div>
                    <h3>{props.name} (<span className="culur">{props.blog}</span>)</h3>
                    <p>{props.id}</p>
                </div>
                <div>
                    <ToastContainer />
                    <button
                        className="user__delete">{<PersonRemoveIcon />}</button>
                </div>
            </form>
        </>
    )
}