import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    });

    // State for errors
    const [errors, setErrors] = useState({});

    // State for form submission
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [apiError, setApiError] = useState("");

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = "Full Name must be at least 3 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            newErrors.fullName = "Full Name can only contain letters and spaces";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Mobile Number validation
        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = "Mobile Number is required";
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Mobile Number must be exactly 10 digits";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])/.test(formData.password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number";
        } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
            newErrors.password = "Password must contain at least one special character (@$!%*?&)";
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");
        setSuccessMessage("");

        // Validate form
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Form is valid, proceed with API call
        setIsLoading(true);

        try {
            // Log outgoing payload for debugging
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                password: formData.password,
            };
            console.log("[Signup] sending payload:", payload);
            // ============================================
            // BACKEND API INTEGRATION
            // Replace the URL below with your actual backend URL
            // ============================================
            const response = await fetch("http://localhost:3002/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Try to parse JSON response, but handle non-JSON gracefully
            let data = null;
            try {
                data = await response.json();
            } catch (err) {
                const text = await response.text();
                console.warn("[Signup] non-JSON response:", text);
                data = { message: text || response.statusText };
            }

            console.log("[Signup] response status:", response.status, data);

            if (response.ok) {
                // Success
                setSuccessMessage("Signup successful! Redirecting to dashboard...");
                // Reset form
                setFormData({
                    fullName: "",
                    email: "",
                    mobileNumber: "",
                    password: "",
                    confirmPassword: "",
                });

                // Store auth token (backend provides JWT)
                try {
                    const token = data.token || data.authToken || "";
                    if (token) localStorage.setItem("authToken", token);
                    // Redirect to external dashboard server with token as query param
                    const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001/dashboard";
                    const url = token ? `${dashboardUrl}?token=${encodeURIComponent(token)}` : dashboardUrl;
                    // short delay so user sees the success message
                    setTimeout(() => window.location.href = url, 600);
                } catch (err) {
                    // fallback to internal dashboard route
                    setTimeout(() => navigate("/dashboard"), 600);
                }
            } else {
                // Error response from backend
                setApiError(data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            // Network or other errors
            console.error("Signup error:", error);
            setApiError("An error occurred. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                {/* Left Section - Logo and Info */}
                <div className="signup-left">
                    <div className="signup-logo-section">
                        <Link to="/">
                            <img src="media/images/logo.svg" alt="Zerodha Logo" className="signup-logo" />
                        </Link>
                        <p className="signup-tagline">Create your trading account</p>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="signup-right">
                    <div className="signup-form-wrapper">
                        <h1 className="signup-title">Sign up to open an account</h1>
                        <p className="signup-subtitle">Join thousands of successful traders</p>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="success-message">
                                <p>✓ {successMessage}</p>
                            </div>
                        )}

                        {/* API Error Message */}
                        {apiError && (
                            <div className="error-message">
                                <p>✗ {apiError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="signup-form">
                            {/* Full Name Field */}
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className={`form-input ${errors.fullName ? "input-error" : ""}`}
                                />
                                {errors.fullName && (
                                    <span className="error-text">{errors.fullName}</span>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className={`form-input ${errors.email ? "input-error" : ""}`}
                                />
                                {errors.email && (
                                    <span className="error-text">{errors.email}</span>
                                )}
                            </div>

                            {/* Mobile Number Field */}
                            <div className="form-group">
                                <label htmlFor="mobileNumber">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter 10-digit mobile number"
                                    maxLength="10"
                                    className={`form-input ${errors.mobileNumber ? "input-error" : ""}`}
                                />
                                {errors.mobileNumber && (
                                    <span className="error-text">{errors.mobileNumber}</span>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Create a strong password"
                                    className={`form-input ${errors.password ? "input-error" : ""}`}
                                />
                                {errors.password && (
                                    <span className="error-text">{errors.password}</span>
                                )}
                                <p className="password-hint">
                                    Password must be at least 8 characters with uppercase, lowercase, number, and special character
                                </p>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Re-enter your password"
                                    className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
                                />
                                {errors.confirmPassword && (
                                    <span className="error-text">{errors.confirmPassword}</span>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div className="terms-section">
                                <p>
                                    By creating an account, you agree to our{" "}
                                    <Link to="/terms" className="terms-link">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="terms-link">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="signup-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </button>
                        </form>

                        {/* Login Link */}
                        <p className="login-link">
                            Already have an account?{" "}
                            <Link to="/login" className="login-link-text">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
