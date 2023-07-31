import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
            setBlog(data[0]);
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
                <h1>{blog.title}</h1>
                <p>{blog.description}</p>
                <div className="blog__info">
                    <p>{blog.name}</p>
                    <p>{blog.categories}</p>
                    <p>{blog.date.slice(0, 10)}</p>
                </div>
            </div>
        </>
    )
}