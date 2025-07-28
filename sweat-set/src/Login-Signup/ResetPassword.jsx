import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            axios
                .post(`http://localhost:5001/password/reset-password/${token}`, {
                    password,
                })
                .then((res) => {
                    alert("Password reset successful");
                    console.log(res.data);
                    navigate("/login");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                className="bg-gray-800 shadow-md rounded px-10 pt-8 pb-8 mb-4 w-96 shadow-gray-500"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl mb-6 text-white text-center">
                    Reset Password
                </h2>
                <div className="mb-6">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        New Password:
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
                        htmlFor="confirmPassword"
                    >
                        Confirm New Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;