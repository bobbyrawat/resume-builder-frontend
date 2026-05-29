import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (

    <section className="flex flex-col md:flex-row items-center px-6 md:px-12 py-20 bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">

      {/* LEFT */}

      <div className="flex-1">

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">

          Build Your{" "}

          <span className="text-purple-600">
            Dream Resume
          </span>{" "}

          in Minutes

        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-600 max-w-lg">

          Create professional, ATS-friendly resumes
          with our AI-powered resume builder.

        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/auth")}
            className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300"
          >
            Start Building
          </button>

          <button
            onClick={() => navigate("/auth")}
            className="border border-gray-300 px-8 py-3 rounded-full hover:bg-white transition duration-300"
          >
            View Templates
          </button>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex-1 mt-12 md:mt-0 flex justify-center">

        <img
          src="template1.webp"
          alt="resume preview"
          className="rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg hover:scale-105 transition duration-500"
        />

      </div>

    </section>
  );
}

export default Hero;