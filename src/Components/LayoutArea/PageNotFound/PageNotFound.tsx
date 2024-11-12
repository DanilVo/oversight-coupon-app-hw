import "./PageNotFound.css";
import notFound from "../../../Assets/not_found.png";
import useTitle from "../../../Utils/useTitle";

function PageNotFound(): JSX.Element {
    useTitle('Not found')
    return (
        <div className="PageNotFound">
            <h2>404 Page not found</h2>
            <img src={notFound} />
        </div>
    );
}

export default PageNotFound;
