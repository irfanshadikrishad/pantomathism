import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AdminCard from "./AdminCard";

export default function Admin() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const callAdmin = async () => {
            const resp = await fetch('http://localhost:3001/panel/admin', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await resp.json();
            setAdmin(data);
            if (resp.status === 200) {

            } else {
                navigate('/panel');
            }
        }
        const getAll = async () => {
            const response = await fetch('http://localhost:3001/getall', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await response.json();
            setUsers(data);
        }
        callAdmin();
        getAll();
    }, [navigate, loader])
    return (
        <div className="container page">
            <div className="admin__header">
                <div className="admin__user">
                    <h1>{admin.name}</h1>
                    <p className="admin__tag">Admin</p>
                </div>
                <div>
                    <NavLink to="/logout" className="admin__logout">Logout</NavLink>
                </div>
            </div>
            <div className="users">
                <h1>Users (<span className="primary">{users.length}</span>)</h1>
                <div className="user_cards">
                    {users.map((user, index) => {
                        return <AdminCard
                            key={user._id}
                            name={user.name}
                            id={user._id}
                            blog={user.blog.length}
                            setLoader={setLoader}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}