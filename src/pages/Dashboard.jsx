import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BASE_URL from "../config/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const createResume = async () => {
    const token = localStorage.getItem("token");

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

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error creating resume");
        return;
      }

      const resumeId = data.id || data._id;

      if (!resumeId) {
        alert("Resume ID missing");
        return;
      }

      navigate(`/resume/${resumeId}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-5xl font-bold mb-10">My Resumes</h1>

        <div
          onClick={createResume}
          className="w-80 h-80 bg-white border-dashed border-2 border-blue-400 flex items-center justify-center cursor-pointer"
        >
          <div className="text-center">
            <div className="text-5xl">+</div>
            <p>Create Resume</p>
          </div>
        </div>
      </div>
    </div>
  );
}