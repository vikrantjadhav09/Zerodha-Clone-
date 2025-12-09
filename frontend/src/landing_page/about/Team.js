import React from "react";

function Team() {
    return (
        <div className="container">
            <div className="row p-3 mt-5 border-top">
                <h1 className="text-center ">People</h1>
            </div>

            <div
                className="row p-3 text-muted"
                style={{ lineHeight: "1.8", fontSize: "1.2em" }}
            >
                <div className="col-6 p-3 text-center">
                    <img
                        src="media/images/viki.jpeg"
                        style={{ borderRadius: "100%", width: "50%" }}
                    />
                    <h4 className="mt-5">Vikrant Jadhav</h4>
                    <h6>Developer, AI Innovator</h6>
                </div>
                <div className="col-6 p-3">
                    <p>
                        Vikrant bootstrapped and founded Zerodha-clone in 2025
                        to overcome the challenges he faced while learning full-stack development
                        and understanding how real trading platforms operate.
                        Today, Zerodha-clone reflects his vision of building a smarter, AI-powered brokerage experience inspired by modern fintech innovation.
                    </p>
                    <p>
                        He is an active contributor on GitHub and participates in various open-source communities, continuously improving projects and collaborating with developers to build smarter, more scalable web applications.
                    </p>
                    <p>Experimenting with AI tools and improving his projects is his zen.</p>
                    <p>
                        Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
                        <a href="">Twitter</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Team;