import React from "react";
import "./Hero.css";

function Hero() {
    return (
        <div className="hero-section">
            <h1>Welcome to the Dashboard</h1>
            <p>Explore your dashboard metrics and insights here.</p>

            {/* First row with three boxes */}
            <div className="box-row">
                <div className="box">Box 1</div>
                <div className="box">Box 2</div>
                <div className="box">Box 3</div>
            </div>

            {/* Second row with two boxes */}
            <div className="box-row">
                <div className="box">Box 4</div>
                <div className="box">Box 5</div>
            </div>
        </div>
    );
}

export default Hero;
