import { useNavigate } from "react-router-dom";

function CTA() {

  const navigate =
    useNavigate();

  return (

    <section className="text-center py-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6">

      <h2 className="text-4xl md:text-5xl font-bold leading-tight">

        Ready To Build Your Future?

      </h2>

      <p className="mt-4 text-base md:text-lg">

        Join thousands of professionals

      </p>

      <button
        onClick={() => navigate("/auth")}
        className="mt-8 bg-white text-black px-8 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300 font-semibold"
      >
        Start Building Now
      </button>

    </section>
  );
}

export default CTA;