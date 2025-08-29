import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    message: "",
  });

  const [status, setStatus] = useState(""); 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", tel: "", message: "" }); // clear form
      } else {
        setStatus(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setStatus("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="relative flex items-top justify-center min-h-[700px] bg-gray-950 sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 bg-transparent sm:rounded-l sm:rounded-r pb-8 bg-gray-900 border border-gray-600 ">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Contact Info */}
            <div className="p-6 mr-2 bg-gray-800 sm:rounded-lg">
              <h1 className="text-3xl sm:text-4xl text-gray-300 font-extrabold tracking-tight">
                Get in touch:
              </h1>
              <p className="text-normal text-lg sm:text-xl font-medium text-gray-400 mt-2">
                Fill in the form to start a conversation
              </p>

              {/* Address */}
              <div className="flex items-center mt-8 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-500"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  Patiala, Thapar University, India
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center mt-4 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-500"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  +91 1234567890
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center mt-2 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-500"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  info@sweatset.com
                </div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <form className="p-4 flex flex-col justify-center" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 py-3 px-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 font-semibold focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col mt-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 py-3 px-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 font-semibold focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex flex-col mt-2">
                <input
                  type="tel"
                  name="tel"
                  placeholder="Phone Number"
                  value={formData.tel}
                  onChange={handleChange}
                  className="w-full mt-2 py-3 px-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 font-semibold focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* New Message Field */}
              <div className="flex flex-col mt-2">
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-2 py-3 px-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-300 font-semibold focus:border-red-500 focus:outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="md:w-32 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg mt-3 transition ease-in-out duration-300"
              >
                Submit
              </button>

              {/* ✅ Status message */}
              {status && (
                <p className="mt-3 text-sm font-semibold text-gray-300">{status}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
