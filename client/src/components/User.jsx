import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "./Card";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function User() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const callUser = async () => {
            const response = await fetch(`http://localhost:3001/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            if (response.status === 200) {
                setUser(data);
                setBlogs(data.blog);
            } else {
                navigate('/error404');
            }
        }
        callUser();
    }, [navigate, userId])
    return (
        <div className="container page user">
            <div className="content">
                <img src="/favicon.png"
                    alt="user pfp"
                    draggable="false" />
                <div className="info">
                    <p>{user.name}</p>
                    <a href={`mailto:${user.email}`}
                        target="_blank" rel="noreferrer">
                        {<AlternateEmailIcon />}
                    </a>
                </div>
                <p>{user._id}</p>
            </div>
            <div className="profile__blogs">
                <div className="card__main">
                    {
                        blogs.reverse().map(blog => {
                            return <Card
                                key={blog._id}
                                title={blog.title}
                                details={blog.description.slice(0, 250)}
                                tag={blog.categories}
                                author={blog.name}
                                date={blog.date.slice(2, 10)}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}