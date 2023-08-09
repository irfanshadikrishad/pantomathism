import { useEffect, useState } from "react";
import Card from "./Card";

export default function History() {
    const [blog, setBlog] = useState([]);
    const callPolitics = async () => {
        const response = await fetch('https://pantomathism.onrender.com/religion', {
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
                        return blo.categories === "religion" ?
                            <Card
                                key={blo._id}
                                title={blo.title}
                                details={blo.description.slice(0, 250)}
                                tag={blo.categories}
                                author={blo.name}
                                date={blo.date.slice(2, 10)}
                            /> : null;
                    })
                })}
            </div>
        </section>
    )
}