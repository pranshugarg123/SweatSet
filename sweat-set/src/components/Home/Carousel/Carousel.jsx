import "./Carousel.css";
import React, { useState, useEffect } from "react";

function Carousel({ slides, interval = 3000 }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrent((current) =>
                current === slides.length - 1 ? 0 : current + 1
            );
        }, interval);

        return () => clearInterval(intervalId);
    }, [slides.length, interval]);

    const nextSlide = () => {
        setCurrent((current) =>
            current === slides.length - 1 ? 0 : current + 1
        );
    };

    const prevSlide = () => {
        setCurrent((current) =>
            current === 0 ? slides.length - 1 : current - 1
        );
    };

    return (
        <div className="relative">
            <div
                className="w-full image-blur-top image-blur-bottom relative"
                style={{
                    backgroundImage: `url(${slides[current].url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "100vh",
                }}
            >
                <button
                    className="absolute top-1/2 left-5 transform -translate-y-1/2 z-10"
                    onClick={prevSlide}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
                <button
                    className="absolute top-1/2 right-5 transform -translate-y-1/2 z-10"
                    onClick={nextSlide}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Carousel;
