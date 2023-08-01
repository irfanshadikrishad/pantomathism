import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Admin() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const callAdmin = async () => {
        const response = await fetch('http://localhost:3001/panel/admin', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await response.json();
        console.log(data);
        setAdmin(data);
        if (response.status === 200) {

        } else {
            navigate('/panel');
        }
    }
    useEffect(() => {
        callAdmin();
    })
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
        </div>
    )
}