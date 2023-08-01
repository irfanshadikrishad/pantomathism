import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Politics from "./components/Politics";
import History from "./components/History";
import Religion from "./components/Religion";
import Technology from "./components/Technology";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Create from "./components/Create";
import E404 from "./components/E404";
import Blog from "./components/Blog";
import Panel from "./components/Panel";
import Admin from "./components/Admin";

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/politics" element={<Politics />} />
                <Route path="/history" element={<History />} />
                <Route path="/religion" element={<Religion />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/create" element={<Create />} />
                <Route path="/blogs/:blogTitle" element={<Blog />} />
                <Route path="/panel" element={<Panel />} />
                <Route path="/panel/admin" element={<Admin />} />
                <Route path="*" element={<E404 />} />
            </Routes>
        </>
    )
}