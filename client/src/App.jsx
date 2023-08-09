import React, { createContext, useReducer } from "react";
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
import Anime from "./components/Anime";
import Manga from "./components/Manga";
import Trending from "./components/Trending";
import User from "./components/User";
import { initialState, reducer } from "./reducer/UserReducer";

export const LoginContext = createContext();

const Routing = () => {
    return <Routes>
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
        <Route path="/anime" element={<Anime />} />
        <Route path="/manga" element={<Manga />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="*" element={<E404 />} />
    </Routes>
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <LoginContext.Provider value={{ state, dispatch }}>
                <Navbar />
                <Routing />
            </LoginContext.Provider>
        </>
    )
}