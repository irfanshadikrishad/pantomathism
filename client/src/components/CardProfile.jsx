import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card(props) {
    function successToast(tweet) {
        toast.success(`${tweet}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    function errorToast(error) {
        toast.error(`${error}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/blog/delete', {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                blogId: props.blogId,
                userId: props.id
            })
        })
        const data = await response.json();

        if (response.status === 200) {
            successToast(`Deleted Successfully`);
            props.setLoader(prev => !prev);
        } else {
            errorToast(data.error);
        }

    }
    return (
        <form onSubmit={handleSubmit}
            className="home__card"
            method="patch">
            <div className="card__top">
                <a href={`/blogs/${props.title}`}>
                    <h1 className="card__h1">{props.title}</h1>
                </a>
                <p className="card_details">{props.details}...</p>
            </div>
            <div className="card__bottom">
                <NavLink to={`/${props.tag}`}>
                    <p className="tags">
                        {<CategoryIcon />}{props.tag}
                    </p>
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
            <div className="card__delete">
                <button type="submit">
                    {<ClearIcon />}
                </button>
            </div>
            <ToastContainer />
        </form>
    )
}