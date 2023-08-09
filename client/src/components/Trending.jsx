import { useEffect, useState } from "react";
import Card from "./Card";

export default function Trending() {
    const [blog, setBlog] = useState([]);
    const callTrending = async () => {
        const response = await fetch('http://localhost:3001/getAll', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        setBlog(data);
    }
    useEffect(() => {
        callTrending();
    }, [blog]);
    return (
        <section className="container page">
            <div className="card__main">
                {blog.map(b => {
                    return b.blog.map((blo, index) => {
                        return <Card
                            key={blo._id}
                            title={blo.title}
                            details={blo.description.slice(0, 250)}
                            tag={blo.categories}
                            author={blo.name}
                            date={blo.date.slice(2, 10)}
                        />
                    })
                })}
            </div>
        </section>
    )
}