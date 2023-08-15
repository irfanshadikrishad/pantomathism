import { useEffect, useState } from "react";
import Card from "./Card";

export default function Trending() {
    const [blog, setBlog] = useState(null);
    const callTrending = async () => {
        const response = await fetch('https://pantomathism.onrender.com/getAll', {
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
                {blog ? blog.map(b => {
                    return b.blog.map((blo, index) => {
                        return <Card
                            key={blo._id}
                            id={b._id}
                            title={blo.title}
                            details={blo.description.slice(0, 250)}
                            tag={blo.categories}
                            author={blo.name}
                            date={blo.date.slice(2, 10)}
                        />
                    })
                }) : <img src="https://media.tenor.com/jfmI0j5FcpAAAAAd/loading-wtf.gif"
                    alt="loading loader" width="75px" />}
            </div>
        </section>
    )
}