import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact.jsx";
import Profile from "./components/Profile/Profile.jsx";
import CountCam from "./components/CountCam/CountCam.jsx";
import Login from "./Login-Signup/Login.jsx";
import Signup from "./Login-Signup/Signup.jsx";
import ForgetPassword from "./Login-Signup/ForgetPassword.jsx";
import ResetPassword from "./Login-Signup/ResetPassword.jsx";
import AdditionalInfo from "./Login-Signup/AdditionalInfo.jsx";

function App() {


    // Logged in user
    const [userLoggedin, setUserLoggedin] = useState(null);

    const [cookies] = useCookies(["username"]);

    useEffect(() => {
        // Run once when the component is mounted
        if (cookies.username && userLoggedin === null) {
            setUserLoggedin(cookies.username);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                            <Home
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                            <Footer
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                        </>
                    }
                />
                <Route
                    path="about"
                    element={
                        <>
                            <Header
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                            <About
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                            <Footer
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                        </>
                    }
                />
                <Route
                    path="contact"
                    element={
                        <>
                            <Header
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                            <Contact
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                            <Footer
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                        </>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <>
                            <Header
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                            <Profile
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                            <Footer
                                userLoggedin={userLoggedin}
                                setUserLoggedin={setUserLoggedin}
                            />
                        </>
                    }
                />

                {/* Cam Page */}
                <Route
                    path="sweat-set"
                    element={
                        <CountCam
                            userLoggedin={userLoggedin}
                            setUserLoggedin={setUserLoggedin}
                        />
                    }
                />

                {/* Login - Signup */}
                <Route
                    path="login"
                    element={
                        <Login
                            userLoggedin={userLoggedin}
                            setUserLoggedin={setUserLoggedin}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <Signup
                            userLoggedin={userLoggedin}
                            setUserLoggedin={setUserLoggedin}
                        />
                    }
                />
                <Route
                    path="forgot-password"
                    element={
                        <ForgetPassword
                            userLoggedin={userLoggedin}
                            setUserLoggedin={setUserLoggedin}
                        />
                    }
                />
                <Route
                    path="reset-password/:token"
                    element={
                        <ResetPassword
                            userLoggedin={userLoggedin}
                            setUserLoggedin={setUserLoggedin}
                        />
                    }
                />

                <Route
                    path="addinfo"
                    element={
                        <AdditionalInfo
                            userLoggedin={userLoggedin}
                            setUserLoggedin={setUserLoggedin}
                        />
                    }
                />
                
                {/* any thing else */}
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
