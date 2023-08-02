import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

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
    const callBlog = async () => {
        const response = await fetch(`http://localhost:3001/blogs/${blogTitle}`, {
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
    useEffect(() => {
        callBlog();
    }, [])
    return (
        <>
            <div className="container page">
                <h1 className="blog__title">{blog.title}</h1>
                <p className="blog__details">{blog.description}</p>
                <div className="blog__info">
                    <p>{blog.name}</p>
                    <NavLink to={`/${blog.categories}`}>{blog.categories}</NavLink>
                    <p>{blog.date.slice(0, 10)}</p>
                </div>
            </div>
        </>
    )
}