import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile({ userLoggedin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [img, setImg] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const [pushUpCount, setPushUpCount] = useState(0);
  const [caloricBurn, setCaloricBurn] = useState(0);

  const [targetPushUps, setTargetPushUps] = useState(100);
  const [newTarget, setNewTarget] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // Verify user login
  useEffect(() => {
    if (!userLoggedin) return;

    axios
      .get("http://localhost:5001/verify/verifyUser", { withCredentials: true })
      .then((res) => {
        if (!res.data.status) navigate("/login");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [userLoggedin, navigate]);

  // Fetch user basic info
  useEffect(() => {
    if (!userLoggedin) return;

    axios
      .post("http://localhost:5001/extract/profile", { userLoggedin })
      .then((res) => {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setRegisteredDate(res.data.user.dateRegistered);
      })
      .catch(console.error);
  }, [userLoggedin]);

  // Fetch push-up stats
  useEffect(() => {
    if (!userLoggedin) return;

    axios
      .post("http://localhost:5001/extract/pushup", { userLoggedin })
      .then((res) => {
        setPushUpCount(res.data.totalPushUpCount);
        setCaloricBurn(res.data.totalCaloricBurn);
      })
      .catch(console.error);
  }, [userLoggedin]);

  // Fetch additional info
  useEffect(() => {
    if (!userLoggedin) return;

    axios
      .post("http://localhost:5001/extract/addinfo", { userLoggedin })
      .then((res) => {
        if (res.data.info) {
          setAge(res.data.info.dob);
          setWeight(res.data.info.weight);
          setHeight(res.data.info.height);
          setImg(res.data.info.imageLink);
        }
      })
      .catch(console.error);
  }, [userLoggedin]);

  // Fetch target push-ups
  useEffect(() => {
    if (!userLoggedin) return;

    axios
      .post("http://localhost:5001/pushUp/target/get", { username: userLoggedin })
      .then((res) => {
        if (res.data.targetPushUps) setTargetPushUps(res.data.targetPushUps);
      })
      .catch(console.error);
  }, [userLoggedin]);

  // Update target push-ups
  const updateTarget = () => {
    if (!newTarget || isNaN(newTarget) || newTarget <= 0) {
      alert("Please enter a valid positive number");
      return;
    }

    axios
      .post("http://localhost:5001/pushUp/target", {
        username: userLoggedin,
        targetPushUps: Number(newTarget),
      })
      .then(() => {
        setTargetPushUps(Number(newTarget));
        setNewTarget("");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update target");
      });
  };

  if (!userLoggedin) {
    return <h1 className="text-white p-6">Loading...</h1>;
  }

  return (
    <div className="bg-gray-950 text-gray-300 py-8 px-4">
      <h2 className="text-3xl mb-8 text-center">
        <span>Welcome </span>
        <span className="transform -skew-x-15 bg-red-500 text-white inline-block px-2">
          {userLoggedin}
        </span>
      </h2>

      <div className="flex flex-wrap justify-center">
        {/* Profile Section */}
        <div className="w-full md:w-2/5 md:px-4 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-slate-500">
            <h3 className="text-2xl mb-4 text-center border-b-2 border-gray-400 pb-2">
              Your Profile
            </h3>

            <div className="flex items-center justify-center mb-4 py-4">
              <img
                src={
                  img ||
                  "https://www.powergrid.in/sites/default/files/inline-images/user-img-new.png?itok=d1cFvGQL"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full mr-2"
              />
            </div>

            <div className="flex flex-col space-y-2 px-8 text-lg">
              <p className="flex justify-between">
                <span className="font-bold">Name:</span>
                <span>{name || "Loading..."}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Username:</span>
                <span>{userLoggedin}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Email:</span>
                <span>{email}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Registered:</span>
                <span>{new Date(registeredDate).toLocaleDateString()}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Age:</span>
                <span>
                  {age
                    ? `${Math.floor(
                        (new Date() - new Date(age)) / 31557600000
                      )} Years`
                    : "NOT SET"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Weight:</span>
                <span>{weight || "NOT SET"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Height:</span>
                <span>{height || "NOT SET"}</span>
              </p>
            </div>
          </div>

          {/* Add/Update Additional Info Button */}
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/addinfo")}
            >
              {age && weight && height ? "Update Info" : "Add Info"}
            </button>
          </div>
        </div>

        {/* Records Section */}
        <div className="w-full md:w-3/5 md:px-4 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-slate-500">
            <h3 className="text-2xl mb-4 text-center border-b-2 border-gray-400 pb-2">
              Your Records
            </h3>

            <div className="flex flex-col space-y-4 px-8 text-lg">
              {/* Push-Up Count */}
              <div>
                <div className="flex justify-between">
                  <span className="font-bold">PushUp Count:</span>
                  <span>
                    {pushUpCount}/{targetPushUps}
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full relative my-1">
                  <div
                    className="h-4 bg-blue-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        (pushUpCount / targetPushUps) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Caloric Burn */}
              <div>
                <div className="flex justify-between">
                  <span className="font-bold">Caloric Burn:</span>
                  <span>{caloricBurn} Cal</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full relative my-1">
                  <div
                    className="h-4 bg-blue-500 rounded-full"
                    style={{
                      width: `${Math.min((caloricBurn / 0.29), 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Target Progress */}
              <div>
                <div className="flex justify-between">
                  <span className="font-bold">Target Progress:</span>
                  <span>
                    {Math.min(
                      (pushUpCount / targetPushUps) * 100,
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full relative my-1">
                  <div
                    className="h-4 bg-blue-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        (pushUpCount / targetPushUps) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Update Target Push-Ups */}
              <div className="mt-6 px-8">
                <label className="block mb-2 font-bold" htmlFor="targetInput">
                  Update Target Push-Ups:
                </label>
                <input
                  id="targetInput"
                  type="number"
                  placeholder="Enter new target"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="p-2 rounded text-black w-full"
                />
                <button
                  onClick={updateTarget}
                  className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                  style={{ width: "220px" }}
                >
                  Update Target
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
