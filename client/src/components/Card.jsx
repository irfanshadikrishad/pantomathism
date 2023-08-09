import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

export default function Card(props) {
    return (
        <div className="home__card">
            <div className="card__top">
                <a href={`/blogs/${props.title}`}>
                    <h1 className="card__h1">{props.title}</h1>
                </a>
                <p className="card_details">{props.details}...</p>
            </div>
            <div className="card__bottom">
                <NavLink to={`/${props.tag}`}>
                    <p className="tags">{<CategoryIcon />}{props.tag}</p>
                </NavLink>
                <NavLink to={`/user/${props.id}`}>
                    <p className="author">
                        {<AccountCircleIcon />}{props.author}
                    </p>
                </NavLink>
                <p className="card__date">
                    {<AccessTimeFilledIcon />}{props.date}
                </p>
            </div>
        </div>
    )
}