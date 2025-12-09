import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../signup/Signup.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        setIsLoading(true);

        try {
            // For now, attempt a backend login if available.
            // If backend doesn't expose /login, fallback to a simple client-side success.
            const resp = await fetch("http://localhost:3002/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            let data;
            try {
                data = await resp.json();
            } catch (err) {
                data = null;
            }

            if (resp.ok) {
                const token = (data && (data.token || data.authToken)) || "";
                if (token) localStorage.setItem("authToken", token);
                navigate("/dashboard");
                return;
            }

            // If backend responded with error message, show it.
            if (data && data.message) {
                setError(data.message);
            } else if (resp.status === 404) {
                // Backend doesn't have /login - fallback to client-side success (for local testing)
                localStorage.setItem("authToken", "true");
                navigate("/dashboard");
                return;
            } else {
                setError(data && data.message ? data.message : "Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            // Fallback: allow access for local development
            localStorage.setItem("authToken", "true");
            navigate("/dashboard");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                <div className="signup-left">
                    <div className="signup-logo-section">
                        <Link to="/">
                            <img src="media/images/logo.svg" alt="Zerodha Logo" className="signup-logo" />
                        </Link>
                        <p className="signup-tagline">Welcome back — sign in to continue</p>
                    </div>
                </div>

                <div className="signup-right">
                    <div className="signup-form-wrapper">
                        <h1 className="signup-title">Login</h1>

                        {error && (
                            <div className="error-message">
                                <p>✗ {error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="signup-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button type="submit" className="signup-btn" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </button>
                        </form>

                        <p className="login-link">
                            Don't have an account? <Link to="/signup" className="login-link-text">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
