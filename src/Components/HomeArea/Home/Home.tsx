import Content from "./Content";
import "./Home.css";
import SignInCard from "./SignInCard";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<Content/>
            <SignInCard/>
        </div>
    );
}

export default Home;
