export default function ResumeForm({ data, setData }) {
  return (
    <div className="p-4 border rounded-xl">
      <h3 className="font-semibold mb-3">Personal Info</h3>

      <input
        placeholder="Full Name"
        className="w-full mb-3 p-2 border rounded"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        placeholder="Title"
        className="w-full mb-3 p-2 border rounded"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <textarea
        placeholder="Summary"
        className="w-full p-2 border rounded"
        value={data.summary}
        onChange={(e) => setData({ ...data, summary: e.target.value })}
      />
    </div>
  );
}