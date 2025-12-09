import React from "react";

const Apps = () => {
    return (
        <div style={styles.container}>

            <div style={styles.section}>
                <h1>About Me</h1>
                <hr />
                <p style={styles.text}>
                    Hi, I am a MERN stack developer passionate about building modern,
                    fast and scalable web applications. I enjoy creating real-world
                    applications that improve user workflow and deliver smooth UX.
                </p>

                <p style={styles.text}>
                    <strong>Zerodha Clone Project:</strong> This is a full-stack trading
                    platform clone built using React, Node.js, Express, and MongoDB.
                    It includes authentication, dashboard UI, live holdings, watchlist,
                    orders, and advanced charts. The goal of this project is to replicate
                    a fast, responsive, and user-friendly trading experience similar to
                    Zerodha (Kite).
                </p>

            </div>

            <div style={styles.section}>
                <h2>Connect with Me</h2>

                <a
                    href="https://www.linkedin.com/in/jadhav-vikrant09/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                >
                    🔗 LinkedIn Profile
                </a>

                <a
                    href="https://github.com/vikrantjadhav09"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.link}
                >
                    🐙 GitHub Profile
                </a>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    section: {
        marginBottom: "20px",
    },
    text: {
        fontSize: "16px",
        lineHeight: "24px",
        color: "#333",
    },
    link: {
        display: "block",
        marginTop: "10px",
        fontSize: "18px",
        textDecoration: "none",
        color: "#0077b5",
        fontWeight: "bold",
    },
};

export default Apps;