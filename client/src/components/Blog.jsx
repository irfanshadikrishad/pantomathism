import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default function Blog() {
    const { blogTitle } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: "",
        description: "",
        name: "",
        categories: "",
        date: ""
    });

    useEffect(() => {
        const callBlog = async () => {
            const response = await fetch(`https://pantomathism.onrender.com/blogs/${blogTitle}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await response.json();
            if (response.status === 200) {
                setBlog(data);
            } else {
                navigate('/error');
            }
        }
        callBlog();
    }, [blog, blogTitle, navigate])
    return (
        <>
            <div className="container page">
                <h1 className="blog__title">{blog.title}</h1>
                <p className="blog__details">{blog.description}</p>
                <div className="blog__info">
                    <p>{<AccountCircleIcon />} {blog.name}</p>
                    <NavLink to={`/${blog.categories}`}>
                        {<CategoryIcon />} {blog.categories}
                    </NavLink>
                    <p>
                        {<AccessTimeFilledIcon />} {blog.date.slice(0, 10)}
                    </p>
                </div>
            </div>
        </>
    )
}