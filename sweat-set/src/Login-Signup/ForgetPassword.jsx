import React, { useState } from "react";
import axios from "axios";

function ForgetPassword() {
    const [email, setEmail] = useState("");

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5001/password/forgot-password", {
                email,
            })
            .then((res) => {
                alert("Email sent")
                console.log(res.data);
            })
            .catch((err) => {
                alert("User does not exist")
                console.log(err);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                className="bg-gray-800 shadow-md rounded px-10 pt-8 pb-8 mb-4 w-96 shadow-gray-500"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl mb-6 text-white text-center">
                    Forgot Password
                </h2>
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
                        className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ForgetPassword;
