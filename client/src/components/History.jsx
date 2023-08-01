import { useEffect, useState } from "react";
import Card from "./Card";

export default function History() {
    const [blog, setBlog] = useState([]);
    const callPolitics = async () => {
        const response = await fetch('http://localhost:3001/history', {
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
                {blog.map(b => {
                    return b.blog.map((blo, index) => {
                        if (blo.categories === "history") {
                            return <Card
                                key={blo._id}
                                title={blo.title}
                                details={blo.description.slice(0, 100)}
                                tag={blo.categories}
                                author={blo.name}
                                date={blo.date.slice(0, 10)}
                            />
                        }
                    })
                })}
            </div>
        </section>
    )
}