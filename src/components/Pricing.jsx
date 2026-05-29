import { useNavigate } from "react-router-dom";

function Pricing() {

  const navigate =
    useNavigate();

  return (

    <section className="px-6 md:px-12 py-20 text-center bg-gray-50">

      <h2 className="text-4xl font-bold">

        Simple, Transparent Pricing

      </h2>

      <p className="text-gray-500 mt-3">

        Choose the plan that works best for you

      </p>

      <div className="flex flex-col md:flex-row justify-center gap-10 mt-12">

        {/* FREE PLAN */}

        <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-sm hover:shadow-2xl transition duration-300">

          <h3 className="text-2xl font-bold">
            Free
          </h3>

          <p className="text-5xl font-extrabold mt-4">
            ₹0
          </p>

          <p className="text-gray-500 mt-3">

            Perfect for getting started

          </p>

          <ul className="mt-8 space-y-3 text-left text-gray-700">

            <li>✔ 1 Template</li>

            <li>✔ Basic Editing</li>

            <li>✔ PDF Download</li>

            <li>✔ Email Support</li>

          </ul>

          <button
            onClick={() => navigate("/auth")}
            className="mt-8 w-full border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition font-semibold"
          >
            Get Started
          </button>

        </div>

        {/* PREMIUM PLAN */}

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 rounded-3xl shadow-2xl w-full max-w-sm scale-100 md:scale-105">

          <h3 className="text-2xl font-bold">
            Premium
          </h3>

          <p className="text-5xl font-extrabold mt-4">
            ₹999
          </p>

          <p className="mt-3 text-white/90">

            Unlock all features

          </p>

          <ul className="mt-8 space-y-3 text-left">

            <li>✔ All Templates</li>

            <li>✔ Advanced Editing</li>

            <li>✔ Multiple Exports</li>

            <li>✔ Priority Support</li>

            <li>✔ Custom Branding</li>

          </ul>

          <button
            onClick={() => navigate("/auth")}
            className="mt-8 w-full bg-white text-black py-3 rounded-xl hover:scale-105 transition duration-300 font-semibold"
          >
            Upgrade Now
          </button>

        </div>

      </div>

    </section>
  );
}

export default Pricing;