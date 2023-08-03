export default function ContactSocialCard(props) {
    return <a href={props.link} target="_blank" rel="noreferrer">
        <div className="social__card">
            {props.icon}
            <p>{props.username}</p>
        </div>
    </a>
}