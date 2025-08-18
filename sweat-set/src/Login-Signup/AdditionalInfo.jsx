import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdditionalInfo({ userLoggedin }) {
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [imageLink, setImageLink] = useState("");
  const navigate = useNavigate();

  // Pre-fill existing info
  useEffect(() => {
    if (!userLoggedin) return;

    axios
      .post(
        "http://localhost:5001/extract/addinfo",
        { userLoggedin },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.info) {
          const info = res.data.info;
          setDob(info.dob ? info.dob.split("T")[0] : "");
          setWeight(info.weight || "");
          setHeight(info.height || "");
          setImageLink(info.imageLink || "");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch additional info:", err);
      });
  }, [userLoggedin]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!dob || !weight || !height) {
      alert("Date of Birth, Weight, and Height are required!");
      return;
    }

    axios
      .post(
        "http://localhost:5001/extract/addinfo/upsert",
        { userLoggedin, dob, weight, height, imageLink },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status) {
          alert("Additional information saved successfully!");
          navigate("/profile");
        } else {
          alert("Failed to save additional information!");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Server error while saving information!");
      });
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gray-900">
      <form
        className="bg-gray-800 shadow-md rounded px-10 pt-8 pb-8 mb-4 w-96 shadow-gray-500"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl mb-6 text-white text-center">
          Additional Information
        </h2>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="dob">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="weight">
            Weight:
          </label>
          <input
            type="number"
            id="weight"
            placeholder="in kgs"
            min={10}
            max={200}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="height">
            Height:
          </label>
          <input
            type="text"
            id="height"
            placeholder="e.g. 5'10''"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="imageLink">
            Image Link: 
          </label>
          <input
            placeholder="Profile Pic Link"
            type="text"
            id="imageLink"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight bg-gray-700 focus:outline-none focus:shadow-outline text-white"
            value={imageLink}
            onChange={(event) => setImageLink(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Save
        </button>
      </form>

      <p className="text-gray-600">
        Note: Upload your image on{" "}
        <a href="https://imgbb.com/" target="_blank" className="text-blue-400">
          imgbb.com
        </a>{" "}
        and paste the link here
      </p>
    </div>
  );
}

export default AdditionalInfo;
