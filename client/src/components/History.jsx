import { useEffect, useState } from "react";
import Card from "./Card";

export default function History() {
    const [blog, setBlog] = useState(null);
    const callPolitics = async () => {
        const response = await fetch('https://pantomathism.onrender.com/history', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        setBlog(data);
    }
    useEffect(() => {
        callPolitics();
    }, [blog]);
    return (
        <section className="container page">
            <div className="card__main">
                {blog ? blog.map(b => {
                    return b.blog.map((blo, index) => {
                        return blo.categories === "history" ?
                            <Card
                                key={blo._id}
                                id={b._id}
                                title={blo.title}
                                details={blo.description.slice(0, 250)}
                                tag={blo.categories}
                                author={blo.name}
                                date={blo.date.slice(2, 10)}
                            /> : null;
                    })
                }) : <img src="https://media.tenor.com/jfmI0j5FcpAAAAAd/loading-wtf.gif"
                    alt="loading loader" width="75px" />}
            </div>
        </section>
    )
}