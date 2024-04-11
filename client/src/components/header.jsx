import "../styles/header.scss";

export const Header = ({ heading }) => {
    return (
        <div className="header-container">
            <h2>{heading}</h2>
        </div>
    )
}