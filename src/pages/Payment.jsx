import { useParams, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePayment = () => {
    localStorage.setItem("premium", "true");

    alert("💳 Payment Successful!");
    navigate(`/theme/${id}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-xl text-center">

        <h1 className="text-2xl font-bold mb-4">
          Unlock Premium Templates
        </h1>

        <p className="text-gray-500 mb-6">
          Pay once and access all premium designs
        </p>

        <button
          onClick={handlePayment}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
        >
          Pay ₹199
        </button>

      </div>

    </div>
  );
}