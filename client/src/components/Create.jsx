import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Create() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: ""
    });
    const [cat, setCat] = useState('');
    const [blog, setBlog] = useState({
        title: "",
        description: ""
    })
    const handleBlog = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value });
    }
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
        const resp = await fetch('https://pantomathism.onrender.com/create', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                categories: cat,
                title: blog.title,
                description: blog.description
            }),
            credentials: "include"
        })
        const data = await resp.json();
        if (resp.status === 200) {
            successToast(data.message);
            setCat("");
            setBlog({ title: "", description: "" });
            navigate('/');
        } else {
            errorToast(`${data.message}`);
        }
    }

    useEffect(() => {
        const callData = async () => {
            const response = await fetch('https://pantomathism.onrender.com/data', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await response.json();
            if (response.status === 200) {
                setUser(data);
            } else {
                console.log('create error on get request');
                navigate('/login');
            }
        }
        callData();
    }, [navigate, user, cat, blog]);
    return (
        <>
            <div className="container page">
                <h1>create a blog</h1>
                <form onSubmit={handleSubmit} method="post" className="create__form">
                    <div className="create__info">
                        <input
                            name="name"
                            readOnly={true}
                            value={user.name}
                            type="text" />
                        <input
                            name="email"
                            readOnly={true}
                            value={user.email}
                            type="email" />
                        <input
                            name="categories"
                            onChange={(e) => {
                                setCat(e.target.value)
                            }}
                            value={cat}
                            type="text"
                            placeholder="Category" />
                    </div>
                    <div className="create__content">
                        <input
                            onChange={handleBlog}
                            name="title"
                            type="text"
                            placeholder="Title" />
                        <textarea
                            onChange={handleBlog}
                            name="description"
                            placeholder="Write something ..."></textarea>
                    </div>
                    <button
                        onSubmit={handleSubmit}
                        type="submit">
                        Post
                    </button>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}