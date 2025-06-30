import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUpClick = () => setIsRightPanelActive(true);
    const handleSignInClick = () => setIsRightPanelActive(false);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!emailPattern.test(email)) {
            alert("Please enter a valid Gmail address.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8001/login", {
                email,
                password,
            });
            localStorage.setItem("userLogged", JSON.stringify(response.data.data));
            alert("Login successful");
            navigate("/home");
        } catch (error) {
            alert("Invalid email or password. Please try again!");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!emailPattern.test(email)) {
            alert("Please enter a valid Gmail address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            await axios.post("http://localhost:8001/signup", {
                email,
                password,
                username,
            });
            alert("Registration successful");

            const loginResponse = await axios.post("http://localhost:8001/login", {
                email,
                password,
            });

            localStorage.setItem("userLogged", JSON.stringify(loginResponse.data.data));
            alert("Login successful");
            navigate("/home");
        } catch (error) {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

                    * {
                        padding: 0px;
                        margin: 0px;
                        box-sizing: border-box;
                    }

                    :root {
                        --linear-grad: linear-gradient(to right, #0f2027, #2c5364);
                        --grad-clr1: #0f2027;
                        --grad-clr2: #2c5364;
                        --accent-color: #4caf50;
                    }

                    body {
                        font-family: 'Poppins', sans-serif;
                    }


                    .overlay {
                        background: var(--linear-grad);
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: 0 0;
                        color: #fff;
                        position: relative;
                        left: -100%;
                        height: 100%;
                        width: 200%;
                        transform: translateX(0);
                        transition: transform 0.6s ease-in-out;
                    }

                    .container.right-panel-active .overlay {
                        transform: translateX(50%);
                    }

                    button {
                        border-radius: 20px;
                        border: 1px solid var(--grad-clr1);
                        background-color: #243B55;
                        color: #fff;
                        font-size: 12px;
                        font-weight: bold;
                        padding: 12px 45px;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        transition: transform 80ms ease-in;
                    }

                    button:active {
                        transform: scale(0.95);
                    }

                    button:focus {
                        outline: none;
                    }

                    form {
                        background-color: #fff;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 0 50px;
                        height: 100%;
                        text-align: center;
                    }

                    input {
                        background-color: #eee;
                        border: none;
                        padding: 12px 15px;
                        margin: 8px 0;
                        width: 150%;
                        transition: background-color 0.3s ease;
                    }

                    input:focus {
                        background-color: #ddd;
                        outline: none;
                    }

                   
                `}            </style>

            <div className="h-screen w-screen flex items-center justify-center bg-[#f6f5f7] font-poppins">
                <div
                    className={`relative w-[768px] max-w-full min-h-[600px] bg-white rounded-lg shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] overflow-hidden transition-transform duration-700 ease-in-out ${isRightPanelActive ? "translate-x-0" : ""
                        }`}
                >
                    {/* Sign In Form */}
                    <div
                        className={`absolute top-0 h-full w-1/2 px-10 py-8 transition-all duration-700 ease-in-out z-[2] bg-white flex flex-col justify-center items-center text-center ${isRightPanelActive ? "translate-x-full opacity-0 z-[1]" : "translate-x-0 opacity-100 z-[5]"
                            }`}
                    >
                        <form onSubmit={handleLogin} className="w-full">
                            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mb-3 bg-gray-100 rounded outline-none"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mb-3 bg-gray-100 rounded outline-none"
                                required
                            />
                            <a href="#" className="text-sm text-gray-600 mb-4 inline-block hover:text-gray-800">
                                Forgot your password?
                            </a>
                            <button
                                type="submit"
                                className="w-full bg-[#243B55] text-white py-3 rounded uppercase text-sm font-bold"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Sign Up Form */}
                    <div
                        className={`absolute top-0 h-full w-1/2 left-0 px-10 py-8 transition-all duration-700 ease-in-out bg-white flex flex-col justify-center items-center text-center ${isRightPanelActive ? "translate-x-full opacity-100 z-[5]" : "translate-x-0 opacity-0 z-[1]"
                            }`}
                    >
                        <form onSubmit={handleRegister} className="w-full">
                            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
                            <input
                                type="text"
                                placeholder="Name"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 mb-3 bg-gray-100 rounded outline-none"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mb-3 bg-gray-100 rounded outline-none"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mb-3 bg-gray-100 rounded outline-none"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 mb-3 bg-gray-100 rounded outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#243B55] text-white py-3 rounded uppercase text-sm font-bold"
                            >
                                Sign Up
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
                                        : "Enter your personal details and start exploring the latest gadgets"}
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
        </>
    );
};

export default Auth;