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

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

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

  useEffect(() => {
    if (!userLoggedin) return;

    axios
      .post("http://localhost:5001/extract/addinfo", { userLoggedin })
      .then((res) => {
        setAge(res.data.info.dob);
        setWeight(res.data.info.weight);
        setHeight(res.data.info.height);
        setImg(res.data.info.imageLink);
      })
      .catch(console.error);
  }, [userLoggedin]);

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

          <div className="text-center mt-4">
            {age && weight && height ? null : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/addinfo")}
              >
                Add Info
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-3/5 md:px-4 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-slate-500">
            <h3 className="text-2xl mb-4 text-center border-b-2 border-gray-400 pb-2">
              Your Records
            </h3>

            <div className="flex flex-col space-y-4 px-8 text-lg">
              <div>
                <div className="flex justify-between">
                  <span className="font-bold">PushUp Count:</span>
                  <span>{pushUpCount}/100</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full relative my-1">
                  <div
                    className="h-4 bg-blue-500 rounded-full relative"
                    style={{ width: `${pushUpCount}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="font-bold">Caloric Burn:</span>
                  <span>{caloricBurn} Cal</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full relative">
                  <div
                    className="h-4 bg-blue-500 rounded-full relative my-1"
                    style={{ width: `${caloricBurn / 0.29}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span className="font-bold">Target:</span>
                  <span>
                    {Math.min((pushUpCount / 100) * 100, 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full relative">
                  <div
                    className="h-4 bg-blue-500 rounded-full relative my-1"
                    style={{
                      width: `${Math.min((pushUpCount / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
