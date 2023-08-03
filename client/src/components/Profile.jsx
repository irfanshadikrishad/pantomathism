import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

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
            setUser(data);

            if (res.status === 200) {

            } else {
                navigate('/login');
            }
        }
        callProfile();
    }, [navigate, user]);
    return (
        <div className="container page">
            <h1 className="the__title">Profile</h1>
            <div className="content">
                <table className="profile__table">
                    <tr>
                        <td>ID:</td>
                        <td>{user._id}</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                    </tr>
                </table>
            </div>
            <div className="logout__btns">
                <NavLink to="/create" className="logout">Post a blog</NavLink>
                <NavLink to="/logout" className="logout">Log Out</NavLink>
            </div>
        </div>
    )
}