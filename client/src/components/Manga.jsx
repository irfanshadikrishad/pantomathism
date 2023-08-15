import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Manga() {
    const [manga, setManga] = useState(null);

    const callManga = async () => {
        const response = await fetch('https://pantomathism.onrender.com/manga', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        setManga(data);
    }

    useEffect(() => {
        callManga();
    }, [])
    return (
        <div className="container page manga">
            <div className="card__main">
                {manga ? manga.map(mango => {
                    return mango.blog.map((mangas, index) => {
                        return mangas.categories === "manga" ?
                            <Card
                                key={mangas._id}
                                id={mango._id}
                                title={mangas.title}
                                details={mangas.description.slice(0, 250)}
                                tag={mangas.categories}
                                author={mangas.name}
                                date={mangas.date.slice(2, 10)}
                            /> : null;
                    })
                }) : <img src="https://media.tenor.com/jfmI0j5FcpAAAAAd/loading-wtf.gif"
                    alt="loading loader" width="75px" />}
            </div>
        </div>
    )
}