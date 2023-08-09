import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Card from "./Card";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const callProfile = async () => {
            const res = await fetch('http://localhost:3001/profile', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            await setUser(data);
            await setBlogs(data.blog);

            if (res.status === 200) {

            } else {
                navigate('/login');
            }
        }
        callProfile();
    }, [navigate, user]);
    return (
        <div className="container page">
            <div className="content">
                <img src="/favicon.png"
                    alt="user image"
                    draggable="false" />
                <div className="info">
                    <p>{user.name}</p>
                    <a href={`mailto:${user.email}`} target="_blank">
                        {<AlternateEmailIcon />}
                    </a>
                </div>
                <p>{user._id}</p>
            </div>
            <div className="logout__btns">
                <NavLink
                    to="/create"
                    className="logout">
                    Create a blog
                </NavLink>
                <NavLink
                    to="/logout"
                    className="logout">
                    Log Out
                </NavLink>
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
        </div >
    )
}