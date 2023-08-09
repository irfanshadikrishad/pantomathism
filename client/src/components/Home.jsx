import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import HdIcon from '@mui/icons-material/Hd';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import GavelIcon from '@mui/icons-material/Gavel';
import MosqueIcon from '@mui/icons-material/Mosque';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import BiotechIcon from '@mui/icons-material/Biotech';

export default function Home() {
    const [anime, setAnime] = useState([]);
    const [manga, setManga] = useState([]);
    const [politics, setPolitics] = useState([]);
    const [history, setHistory] = useState([]);
    const [religion, setReligion] = useState([]);
    const [tech, setTech] = useState([]);
    const [trend, setTrend] = useState([]);
    const callTrend = async () => {
        const response = await fetch('http://localhost:3001/get3', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        await setTrend(data);
    }
    const callAnime = async () => {
        const response = await fetch('http://localhost:3001/anime3', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        await setAnime(data);
    }
    const callManga = async () => {
        const response = await fetch('http://localhost:3001/manga3', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        await setManga(data);
    }
    const callPolitics = async () => {
        const response = await fetch('http://localhost:3001/politics3', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        await setPolitics(data);
    }
    const callHistory = async () => {
        const response = await fetch('http://localhost:3001/history3', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        await setHistory(data);
    }
    const callReligion = async () => {
        const response = await fetch('http://localhost:3001/religion3', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        await setReligion(data);
    }
    const callTech = async () => {
        const response = await fetch('http://localhost:3001/technology3', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        await setTech(data);
    }
    useEffect(() => {
        callTrend();
        callAnime();
        callManga();
        callPolitics();
        callHistory();
        callReligion();
        callTech();
    }, [])
    return (
        <section className="container home">
            <section>
                <div className="article__header">
                    <h1>{<WhatshotIcon />} Trending</h1>
                    <NavLink to="/trending">
                        view more {<ArrowForwardIosIcon />}
                    </NavLink>
                </div>
                <div className="card__main">
                    {trend.map(trending => {
                        return trending.blog.map((lamborghini, index) => {
                            return index <= 2 ? <Card
                                key={lamborghini._id
                                }
                                id={trending._id}
                                title={lamborghini.title}
                                details={lamborghini.description.slice(0, 250)}
                                tag={lamborghini.categories}
                                author={lamborghini.name}
                                date={lamborghini.date.slice(2, 10)}
                            /> : null
                        })
                    })}
                </div>
            </section>
            <section>
                <div className="article__header">
                    <h1>{<HdIcon />} Anime</h1>
                    <NavLink to="/anime">
                        view more {<ArrowForwardIosIcon />}
                    </NavLink>
                </div>
                <div className="card__main">
                    {anime.map(ani => {
                        return ani.blog.map((animes, index) => {
                            return animes.categories === "anime" ?
                                <Card
                                    key={animes._id}
                                    id={ani._id}
                                    title={animes.title}
                                    details={animes.description.slice(0, 250)}
                                    tag={animes.categories}
                                    author={animes.name}
                                    date={animes.date.slice(2, 10)}
                                /> : null;
                        })
                    })}
                </div>
            </section>
            <section>
                <div className="article__header">
                    <h1>{<PhotoAlbumIcon />} Manga</h1>
                    <NavLink to="/manga">
                        view more {<ArrowForwardIosIcon />}
                    </NavLink>
                </div>
                <div className="card__main">
                    {manga.map(mango => {
                        return mango.blog.map((mongoo, index) => {
                            return mongoo.categories === "manga" ?
                                <Card
                                    key={mongoo._id}
                                    id={mango._id}
                                    title={mongoo.title}
                                    details={mongoo.description.slice(0, 250)}
                                    tag={mongoo.categories}
                                    author={mongoo.name}
                                    date={mongoo.date.slice(2, 10)}
                                /> : null;
                        })
                    })}
                </div>
            </section>
            <section>
                <div className="article__header">
                    <h1>{<BiotechIcon />} Technology</h1>
                    <NavLink to="/technology">
                        view more {<ArrowForwardIosIcon />}
                    </NavLink>
                </div>
                <div className="card__main">
                    {tech.map(techno => {
                        return techno.blog.map((geek, index) => {
                            return geek.categories === "technology" ?
                                <Card
                                    key={geek._id}
                                    id={techno._id}
                                    title={geek.title}
                                    details={geek.description.slice(0, 250)}
                                    tag={geek.categories}
                                    author={geek.name}
                                    date={geek.date.slice(2, 10)}
                                /> : null;
                        })
                    })}
                </div>
            </section>
            <section>
                <div className="article__header">
                    <h1>{<HistoryEduIcon />} History</h1>
                    <NavLink to="/history">
                        view more {<ArrowForwardIosIcon />}
                    </NavLink>
                </div>
                <div className="card__main">
                    {history.map(historia => {
                        return historia.blog.map((histerical, index) => {
                            return histerical.categories === "history" ?
                                <Card
                                    key={histerical._id}
                                    id={historia._id}
                                    title={histerical.title}
                                    details={histerical.description.slice(0, 250)}
                                    tag={histerical.categories}
                                    author={histerical.name}
                                    date={histerical.date.slice(2, 10)}
                                /> : null;
                        })
                    })}
                </div>
            </section>
            <section>
                <div className="article__header">
                    <h1>{<MosqueIcon />} Religion</h1>
                    <NavLink to="/religion">
                        view more {<ArrowForwardIosIcon />}
                    </NavLink>
                </div>
                <div className="card__main">
                    {religion.map(religionion => {
                        return religionion.blog.map((relation, index) => {
                            return relation.categories === "religion" ?
                                <Card
                                    key={relation._id}
                                    id={religionion._id}
                                    title={relation.title}
                                    details={relation.description.slice(0, 250)}
                                    tag={relation.categories}
                                    author={relation.name}
                                    date={relation.date.slice(2, 10)}
                                /> : null;
                        })
                    })}
                </div>
            </section>
            <section>
                <div className="article__header">
                    <h1>{<GavelIcon />} Politics</h1>
                    <NavLink to="/politics">
                        view more {<ArrowForwardIosIcon />}
                    </NavLink>
                </div>
                <div className="card__main">
                    {politics.map(trash => {
                        return trash.blog.map((dumb, index) => {
                            return dumb.categories === "politics" ?
                                <Card
                                    key={dumb._id}
                                    id={trash._id}
                                    title={dumb.title}
                                    details={dumb.description.slice(0, 250)}
                                    tag={dumb.categories}
                                    author={dumb.name}
                                    date={dumb.date.slice(2, 10)}
                                /> : null;
                        })
                    })}
                </div>
            </section>
        </section>
    )
}