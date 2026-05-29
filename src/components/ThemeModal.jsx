export default function ThemeModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[700px]">

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Change Theme</h2>
          <button onClick={onClose}>❌</button>
        </div>

        <div className="flex gap-4">

          {/* FREE TEMPLATE */}
          <div className="border p-4 rounded cursor-pointer hover:scale-105 transition">
            <p>Basic Template</p>
          </div>

          {/* LOCKED TEMPLATE */}
          <div className="border p-4 rounded opacity-50 relative">
            <p>Premium Template</p>
            <div className="absolute inset-0 flex items-center justify-center">
              🔒
            </div>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Done
        </button>

      </div>
    </div>
  );
}