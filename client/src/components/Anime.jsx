import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Anime() {
    const [anime, setAnime] = useState([]);

    const callAnime = async () => {
        const response = await fetch('http://localhost:3001/anime', {
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
                {anime.map(ani => {
                    return ani.blog.map((animes, index) => {
                        return animes.categories === "anime" ?
                            <Card
                                key={animes._id}
                                title={animes.title}
                                details={animes.description.slice(0, 250)}
                                tag={animes.categories}
                                author={animes.name}
                                date={animes.date.slice(2, 10)}
                            /> : null;
                    })
                })}
            </div>
        </div>
    )
}