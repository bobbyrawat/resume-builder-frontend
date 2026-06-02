export default function ThemeModal({ onClose, onSelect, isPremium }) {

  const templates = [
    { id: "template1", name: "Basic Template", locked: false },
    { id: "template2", name: "Pink Premium", locked: true },
    { id: "template3", name: "Dark Premium", locked: true },
  ];

  const handleSelect = (t) => {

    if (t.locked && !isPremium) {
      alert("This is a premium template. Please upgrade.");
      return;
    }

    onSelect(t.id);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[700px]">

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Change Theme</h2>
          <button onClick={onClose}>❌</button>
        </div>

        <div className="flex gap-4">
          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => handleSelect(t)}
              className={`border p-4 rounded cursor-pointer relative ${
                t.locked && !isPremium ? "opacity-50" : ""
              }`}
            >
              <p>{t.name}</p>

              {t.locked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  🔒
                </div>
              )}
            </div>
          ))}
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