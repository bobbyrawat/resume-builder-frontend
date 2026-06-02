export default function ThemeModal({ onClose, onSelect }) {
  const templates = [
    {
      id: "template1",
      name: "Basic Template",
      locked: false,
    },
    {
      id: "template2",
      name: "Pink Premium",
      locked: true,
    },
    {
      id: "template3",
      name: "Dark Premium",
      locked: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[700px]">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Change Theme</h2>
          <button onClick={onClose}>❌</button>
        </div>

        {/* TEMPLATES */}
        <div className="flex gap-4">
          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                if (!t.locked) onSelect(t.id);
              }}
              className={`border p-4 rounded cursor-pointer relative transition hover:scale-105 ${
                t.locked ? "opacity-50" : ""
              }`}
            >
              <p>{t.name}</p>

              {t.locked && (
                <div className="absolute inset-0 flex items-center justify-center text-xl">
                  🔒
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DONE */}
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