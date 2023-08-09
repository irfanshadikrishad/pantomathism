import { NavLink } from "react-router-dom";

export default function About() {
    return (
        <div className="container page about">
            <div className="about__left">
                <h1 className="the__title">About US</h1>
                <p>This is a project built on the MERN technology by @irfanshadikrishad.</p>
                <p>Learn more about me <NavLink to="/contact">here.</NavLink></p>
            </div>
            <div className="about__right">
                <img draggable="false" src="/favicon.png" alt="" />
            </div>
        </div>
    )
}