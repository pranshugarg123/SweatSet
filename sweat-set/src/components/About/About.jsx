import React from "react";
import Team from "./Team/Team";

export default function About() {
    return (
        <>
            <div className="py-16 bg-black text-white">
                <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div className="md:5/12 lg:w-5/12">
                            <img
                                className="w-full h-auto rounded-lg"
                                src="https://i.ibb.co/HBHwD3b/Untitled-design-2.png"
                                alt="image"
                            />
                        </div>
                        <div className="md:7/12 lg:w-6/12">
                            <h2 className="text-2xl text-red-500 font-bold md:text-4xl">
                                Your Fitness Journey
                            </h2>
                            <p className="mt-6 text-gray-400">
                                Embark on a transformative fitness journey with
                                FitTrack Pro, where we empower users to take
                                charge of their workout progress like never
                                before. Our platform offers detailed insights
                                that enrich your fitness routines, providing
                                invaluable information to optimize and refine
                                your exercise regimens. With personalized data
                                analysis, you'll gain unique insights tailored
                                to your individual needs, enabling you to track
                                progress and make informed decisions on your
                                path to fitness success. Join us and experience
                                the power of precision and clarity in enhancing
                                your overall fitness journey, as we guide you
                                towards achieving your goals with confidence and
                                empowerment.
                            </p>
                            <p className="mt-4 text-gray-400">
                                you'll refine your routines and enhance your
                                overall fitness journey with clarity and
                                confidence. Join us today and embark on a
                                transformative path towards reaching your
                                fitness goals with precision and empowerment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Team />
        </>
    );
}
