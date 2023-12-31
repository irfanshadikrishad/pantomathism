import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Anime() {
    const [anime, setAnime] = useState(null);

    const callAnime = async () => {
        const response = await fetch('https://pantomathism.onrender.com/anime', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        setAnime(data);
    }

    useEffect(() => {
        callAnime();
    }, [])
    return (
        <div className="container page anime">
            <div className="card__main">
                {anime ? anime.map(ani => {
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
                }) : <img src="https://media.tenor.com/jfmI0j5FcpAAAAAd/loading-wtf.gif"
                    alt="loading loader" width="75px" />}
            </div>
        </div>
    )
}