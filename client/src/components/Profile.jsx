import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

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
        setUser(data);

        if (res.status === 200) {

        } else {
            navigate('/login');
        }
    }

    useEffect(() => {
        callProfile();
    }, []);
    return (
        <div className="container page">
            <h1 className="the__title">Profile</h1>
            <div className="content">
                <p><span>ID:</span>{user._id}</p>
                <p><span>Name:</span>{user.name}</p>
                <p><span>Email:</span>{user.email}</p>
            </div>
            <div className="logout__btns">
                <NavLink to="/create" className="logout">Post a blog</NavLink>
                <NavLink to="/logout" className="logout">Log Out</NavLink>
            </div>
        </div>
    )
}