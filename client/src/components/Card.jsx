import { NavLink } from "react-router-dom";

export default function Card(props) {
    return (

        <div className="home__card">
            <img className="card__img" src={props.src} alt="place" />
            <a href="/full-blog-link"><h1 className="card__h1">{props.title}</h1></a>
            <p className="card_details">{props.details}</p>
            <div className="card__bottom">
                <NavLink to={`/${props.tag}`}><p className="tags">[{props.tag}]</p></NavLink>
                <p className="card__date">{props.date}</p>
            </div>
        </div>
    )
}