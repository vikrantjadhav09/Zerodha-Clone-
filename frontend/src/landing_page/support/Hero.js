import React from "react";

function Hero() {
    return (
        <section className="container-fluid" id="supportHero">
            <div className="p-5 " id="supportWrapper">
                <h4>Support Portal</h4>
                <span>Track Tickets</span>
            </div>
            <div className="row p-5 m-3">
                <div className="col-6 p-3">
                    <h1 className="fs-3">
                        Search for an answer or browse help topics to create a ticket
                    </h1>
                    <input placeholder="Eg. how do I activate F&O" />
                    <br />
                    <div>
                        <span>Track account opening</span>
                        <span style={{ marginLeft: 12 }}>Track segment activation</span>
                        <span style={{ display: "block", marginTop: 8 }}>Intraday margins</span>
                        <span style={{ display: "block", marginTop: 8 }}>Kite user manual</span>
                    </div>
                </div>
                <div className="col-6 p-3">
                    <h1 className="fs-3">Featured</h1>
                    <ol>
                        <li>
                            <span>Current Takeovers and Delisting - January 2024</span>
                        </li>
                        <li>
                            <span>Latest Intraday leverages - MIS & CO</span>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
}

export default Hero;