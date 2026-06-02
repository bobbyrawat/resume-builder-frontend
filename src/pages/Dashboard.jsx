import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BASE_URL from "../config/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const createResume = async () => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);
    console.log("BASE_URL:", BASE_URL);

    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: "My Resume",
        }),
      });

      console.log("Response Status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();

        console.error("API Error:", errorText);

        alert(`Error ${res.status}: ${errorText}`);

        return;
      }

      const data = await res.json();

      console.log("Resume Created:", data);

      const resumeId = data.id || data._id;

      if (!resumeId) {
        alert("Resume ID not found in response");
        console.error("Response missing id:", data);
        return;
      }

      navigate(`/resume/${resumeId}`);
    } catch (err) {
      console.error("Create Resume Error:", err);
      alert("Failed to create resume");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold text-gray-800">
              My Resumes
            </h1>

            <p className="text-gray-500 mt-2">
              Create beautiful ATS resumes
            </p>
          </div>
        </div>

        <div
          onClick={createResume}
          className="w-80 h-80 bg-white rounded-3xl shadow-lg border-2 border-dashed border-blue-400 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-2xl transition duration-300"
        >
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-5xl text-blue-600">+</span>
          </div>

          <p className="mt-6 text-2xl font-semibold text-gray-700">
            Create Resume
          </p>
        </div>
      </div>
    </div>
  );
}