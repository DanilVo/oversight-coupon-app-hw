import "./PageNotFound.css";
import notFound from "../../../Assets/bg-404.png";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <h2>404 Page not found</h2>
            <img src={notFound} />
        </div>
    );
}

export default PageNotFound;
