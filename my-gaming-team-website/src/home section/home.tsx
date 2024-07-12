import React from "react";
import './Home.css';
import Header from "./Header";

const Home: React.FC = () => {
    return (
        <div className="home">
            <Header />
            <main>
                <h1>Welcome to OutKast Gaming Team</h1>
                {/* Add your main content here */}
            </main>
        </div>
    );
}

export default Home;
