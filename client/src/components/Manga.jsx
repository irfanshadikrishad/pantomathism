import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Manga() {
    const [manga, setManga] = useState([]);

    const callManga = async () => {
        const response = await fetch('http://localhost:3001/manga', {
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
                {manga.map(mango => {
                    return mango.blog.map((mangas, index) => {
                        return mangas.categories === "manga" ?
                            <Card
                                key={mangas._id}
                                title={mangas.title}
                                details={mangas.description.slice(0, 250)}
                                tag={mangas.categories}
                                author={mangas.name}
                                date={mangas.date.slice(2, 10)}
                            /> : null;
                    })
                })}
            </div>
        </div>
    )
}