import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import Cards from "./Cards/Cards";

export default function Home() {
    const [text, setText] = useState("");
    const fullText = "Sculpt Your Life";

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setText((prevText) => prevText + fullText.charAt(index));
            setIndex((prevIndex) => prevIndex + 1);
            if (index >= fullText.length - 1) {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [index, fullText.length]);

    const slides = [
        {
            url: "https://i.ibb.co/QcKKGrb/28.png",
        },
        {
            url: "https://i.ibb.co/zVx004W/Sparkle.jpg",
        },
        {
            url: "https://i.ibb.co/d5rX4Vx/Unlock-Your-Ultimate-Fitness-Pot.jpg",
        },
    ];

    return (
        <div>
            <div
                className="mx-auto w-full max-w-7xl h-screen"
                style={{
                    marginTop: "-60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <aside
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row-reverse",
                    }}
                    className=" h-full w-screen relative overflow-hidden text-gray-200 rounded-lg sm:mx-16 mx-2 sm:py-16"
                >
                    <div className=" relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24">
                        <div className="max-w-xl  space-y-8 text-center sm:text-right ">
                            <h2 className="transform -skew-x-15 text-4xl font-bold sm:text-6xl min-w-96">
                                SWEAT SET
                                <span className="hidden sm:block text-3xl mt-3">
                                    {text}
                                </span>
                            </h2>

                            <Link
                                className="transform -skew-x-15 mx-1 inline-flex text-gray-50 items-center px-6 py-3 text-lg font-medium bg-red-500 rounded-lg hover:bg-red-600 ring-2 ring-red-500 ring-offset-2 ring-offset-black"
                                to="/sweat-set"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="white"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                &nbsp; Start Now
                            </Link>
                        </div>
                    </div>

                    <div>
                        <img
                            
                            className=""
                            style={{ height: "60%", width: "60%",}}
                            src="https://i.ibb.co/fH9fy53/transparent-woman-jogging.png"
                            alt="image1"
                        />
                    </div>
                </aside>
            </div>

            <div>
                <h1 className="text-center text-gray-200 mb-20 text-4xl font-bold mt-10">
                    Services
                </h1>
                <Cards />
            </div>


            <h1 className="text-center text-gray-200 text-4xl font-bold mt-10">
                That's how it works!!!
            </h1>
            <Carousel slides={slides} />
        </div>
    );
}
