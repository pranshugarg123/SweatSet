import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState(""); // Add this line
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:5001/register/signup", {
                name,
                username,
                email,
                password,
            }) // Add 'name' here
            .then((res) => {
                console.log(res.data);
                navigate("/login");
                alert("Signup successful!");
            })
            .catch((err) => {
                console.log(err);
                alert("Signup failed or user already exists!");
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                className="bg-gray-800 shadow-md rounded px-10 pt-8 pb-8 mb-4 w-96 shadow-gray-500"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl mb-6 text-white text-center">
                    Sign Up
                </h2>
                <div className="mb-6">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
                        onChange={(event) => setName(event.target.value)} // Add this line
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Sign Up
                </button>
                <p className="mt-6 text-center text-sm text-gray-300">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
