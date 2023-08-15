import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default function Card({ title, details, author, id, date, tag }) {
    return (
        <div className="home__card">
            <div className="card__top">
                <a href={`/blogs/${title}`}>
                    <h1 className="card__h1">{title}</h1>
                </a>
                <p className="card_details">{details}...</p>
            </div>
            <div className="card__bottom">
                <NavLink to={`/${tag}`}>
                    <p className="tags">{<CategoryIcon />}{tag}</p>
                </NavLink>
                <NavLink to={`/user/${id}`}>
                    <p className="author">
                        {<AccountCircleIcon />}{author}
                    </p>
                </NavLink>
                <p className="card__date">
                    {<AccessTimeFilledIcon />}{date}
                </p>
            </div>
        </div>
    )
}