// ✅ Enhanced Auth component with full feature set from Login/Register components

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner"; // Reuse spinner if available
import { Mail, Lock, User } from "lucide-react";

const Auth = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUpClick = () => setIsRightPanelActive(true);
    const handleSignInClick = () => setIsRightPanelActive(false);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!emailPattern.test(email)) return toast.error("Enter valid Gmail address");

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8001/login", {
                email,
                password,
            });
            localStorage.setItem("userLogged", JSON.stringify(response.data.data));
            toast.success("Login successful");
            navigate("/home");
        } catch (err) {
            toast.error("Invalid email or password. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!emailPattern.test(email)) return toast.error("Enter valid Gmail address");
        if (password.length < 6) return toast.error("Password must be at least 6 characters");
        if (password !== confirmPassword) return toast.error("Passwords do not match");

        setLoading(true);
        try {
            await axios.post("http://localhost:8001/signup", { email, password, username });
            toast.success("Registration successful");

            const loginRes = await axios.post("http://localhost:8001/login", { email, password });
            localStorage.setItem("userLogged", JSON.stringify(loginRes.data.data));
            toast.success("Login successful");
            navigate("/home");
        } catch (err) {
            toast.error("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (type, value, onChange, placeholder, icon) => (
        <div className="relative w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {icon}
            </div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="pl-10 w-full p-3 mb-3 bg-gray-100 rounded outline-none"
            />
        </div>
    );

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 font-poppins">
            <div
                className={`relative w-[768px] max-w-full min-h-[600px] bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-700 ease-in-out ${isRightPanelActive ? "translate-x-0" : ""
                    }`}
            >
                {/* Sign In Form */}
                <div
                    className={`absolute top-0 h-full w-1/2 px-10 py-8 z-[2] bg-white flex flex-col justify-center items-center text-center transition-all duration-700 ease-in-out ${isRightPanelActive
                        ? "translate-x-full opacity-0 z-[1]"
                        : "translate-x-0 opacity-100 z-[5]"
                        }`}
                >
                    <form onSubmit={handleLogin} className="w-full">
                        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                        {renderInput("email", email, (e) => setEmail(e.target.value), "Email", <Mail size={18} />)}
                        {renderInput("password", password, (e) => setPassword(e.target.value), "Password", <Lock size={18} />)}
                        <a href="#" className="text-sm text-gray-600 mb-4 inline-block hover:text-gray-800">
                            Forgot your password?
                        </a>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#243B55] text-white py-3 rounded uppercase text-sm font-bold flex justify-center items-center"
                        >
                            {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
                        </button>
                    </form>
                </div>

                {/* Sign Up Form */}
                <div
                    className={`absolute top-0 h-full w-1/2 left-0 px-10 py-8 bg-white flex flex-col justify-center items-center text-center transition-all duration-700 ease-in-out ${isRightPanelActive
                        ? "translate-x-full opacity-100 z-[5]"
                        : "translate-x-0 opacity-0 z-[1]"
                        }`}
                >
                    <form onSubmit={handleRegister} className="w-full">
                        <h1 className="text-2xl font-bold mb-4">Create Account</h1>
                        {renderInput("text", username, (e) => setName(e.target.value), "Name", <User size={18} />)}
                        {renderInput("email", email, (e) => setEmail(e.target.value), "Email", <Mail size={18} />)}
                        {renderInput("password", password, (e) => setPassword(e.target.value), "Password", <Lock size={18} />)}
                        {renderInput("password", confirmPassword, (e) => setConfirmPassword(e.target.value), "Confirm Password", <Lock size={18} />)}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#243B55] text-white py-3 rounded uppercase text-sm font-bold flex justify-center items-center"
                        >
                            {loading ? <LoadingSpinner size="sm" /> : "Sign Up"}
                        </button>
                    </form>
                </div>

                {/* Overlay Panel */}
                <div
                    className={`absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-700 ease-in-out z-[100] ${isRightPanelActive ? "-translate-x-full" : ""
                        }`}
                >
                    <div className="bg-gradient-to-r from-[#0f2027] to-[#2c5364] h-full text-white px-10 py-8 flex flex-col justify-between items-center text-center">
                        <div className="w-full h-full flex flex-col justify-center items-center text-white">
                            <h1 className="text-2xl font-bold mb-4">
                                {isRightPanelActive ? "Welcome Back!" : "Hello, Friend!"}
                            </h1>
                            <p className="text-sm mb-6">
                                {isRightPanelActive
                                    ? "To keep connected with us please login with your personal info"
                                    : "Enter your personal details and start analyzing effortlessly"}
                            </p>
                            <button
                                onClick={isRightPanelActive ? handleSignInClick : handleSignUpClick}
                                className="border border-white px-6 py-2 rounded-full text-xs font-bold uppercase hover:bg-white hover:text-[#243B55] transition"
                            >
                                {isRightPanelActive ? "Sign In" : "Sign Up"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;