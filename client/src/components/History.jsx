import Card from "./Card";

export default function History() {
    return (
        <div className="container page">
            <div className="card__main">
                <Card
                    date="26 July, 2023"
                    tag="technology"
                    details="Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum impedit explicabo aut delectus, commodi neque."
                    title="Lorem ipsum dolor sit amet."
                    src="https://placehold.co/800x350" />
                <Card
                    date="25 July, 2023"
                    tag="history"
                    details="Illum impedit explicabo aut delectus, commodi neque."
                    title="Lorem ipsum"
                    src="https://placehold.co/800x350" />
                <Card
                    date="25 July, 2023"
                    tag="history"
                    details="Illum impedit explicabo aut delectus, commodi neque."
                    title="Lorem ipsum"
                    src="https://placehold.co/800x350" />
            </div>
        </div>
    )
}