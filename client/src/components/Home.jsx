import { useEffect, useState } from "react";
import Card from "./Card";

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const callHome = async () => {
        const res = await fetch('http://localhost:3001/getall', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        setBlogs(data);
    }
    useEffect(() => {
        callHome();
    }, [])
    return (
        <section className="container home">
            <div className="card__main">
                {blogs.map((blog, index) => {
                    return blog.blog.map((i, index) => {
                        return <Card
                            key={index}
                            title={i.title}
                            author={i.name}
                            details={i.description.slice(0, 250)}
                            tag={i.categories}
                            date={i.date.slice(2, 10)}
                        />
                    })
                })}
            </div>
        </section>
    )
}