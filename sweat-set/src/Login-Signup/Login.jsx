import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ userLoggedin, setUserLoggedin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    console.log(userLoggedin);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5001/auth/login", {
                username,
                password,
                role,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.login && res.data.role === "trainer") {
                    setUserLoggedin(res.data.username)
                    navigate("/");
                } else if (res.data.login && res.data.role === "user") {
                    setUserLoggedin(res.data.username)
                    navigate("/");
                }else if(res.data == "You are already logged in"){
                    alert(res.data)
                    navigate("/");
                }
            })
            .catch((err) => {
                alert("Invalid username or password")
                console.log(err);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form className="bg-gray-800 shadow-md rounded px-10 pt-8 pb-8 mb-4 w-96 shadow-gray-500">
                <h2 className="text-3xl mb-6 text-white text-center">Login</h2>
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
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="role"
                    >
                        Role:
                    </label>
                    <select
                        id="role"
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="trainer">Trainer</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    onClick={handleSubmit}
                >
                    Login
                </button>
                <p className="mt-4 text-center text-sm text-gray-300">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                <p className="mt-3 text-center text-sm text-gray-300">
                    Forgot your password?{" "}
                    <Link
                        to="/forgot-password"
                        className="text-blue-500 hover:underline"
                    >
                        Reset it
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
