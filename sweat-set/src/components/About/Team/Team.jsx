import React from "react";
import { Link } from "react-router-dom";

const Team = () => {
    const members = [
        {
            id: 1,
            name: "Aditya Pandey",
            image: "https://i.ibb.co/ygw3X0X/Whats-App-Image-2024-04-11-at-22-14-21.jpg",
            profileLink: "https://github.com/AsAdityaSonu",
            email: "asadityasonu@gmail.com",
        },
        {
            id: 2,
            name: "Tanisha",
            image: "https://i.ibb.co/TmM0phT/Screenshot-2024-04-11-at-9-59-43-PM.png",
            profileLink: "https://github.com/Tanisha091",
            email: "tanishabansal004@gmail.com",
        },
        {
            id: 3,
            name: "Vivek",
            image: "https://i.ibb.co/CPR2ZXJ/Whats-App-Image-2024-04-09-at-09-49-40.jpg",
            profileLink: "https://github.com/VIVU2003",
            email: "vkewalramani_be22@thapar.edu",
        },
        {
            id: 4,
            name: "Pranshu",
            image: "https://i.ibb.co/d0d4FwK/Screenshot-20240411-214311-Gallery.jpg",
            profileLink: "https://github.com/pranshugarg123",
            email: "pranshugargktl@gmail.com",
        },
    ];

    const MemberCard = ({ name, image, profileLink, email }) => {
        const handleEmailClick = () => {
            window.open(`mailto:${email}`);
        };
    
        const handleProfileClick = (e) => {
            e.preventDefault();
            window.open(profileLink);
        };

        return (
            <div
                className="flex flex-col items-center justify-center"
                style={{ background: "#111", color: "white" }}
            >
                <div className="flex items-center justify-center w-24 h-24 bg-black rounded-full shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300">
                    <Link to={profileLink} onClick={handleProfileClick}>
                        <img
                            className="object-cover w-full h-full"
                            src={image}
                            alt={name}
                        />
                    </Link>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{name}</h3>
                <button className="text-blue-500" onClick={handleEmailClick}>
                    {email}
                </button>
            </div>
        );
    };

    return (
        <div style={{ background: "#111", borderTop: "solid 1px #222" }}>
            <div className=" flex justify-center text-center font-bold text-4xl pt-6 text-red-500">
                <p>OUR&nbsp;</p>
                <p className=" text-white bg-red-500 w-min">&nbsp;TEAM&nbsp;</p>
            </div>
            <div className="py-16 flex justify-around">
                {members.map((member) => (
                    <MemberCard
                        key={member.id}
                        id={member.id}
                        name={member.name}
                        image={member.image}
                        profileLink={member.profileLink}
                        email={member.email}
                    />
                ))}
            </div>
        </div>
    );
};

export default Team;
