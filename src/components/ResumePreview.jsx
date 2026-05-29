export default function ResumePreview({ data }) {
  return (
    <div className="p-6 border rounded-xl bg-blue-50 min-h-[400px]">
      <h2 className="text-xl font-bold">{data.name || "Your Name"}</h2>
      <p className="text-gray-600">{data.title || "Your Title"}</p>

      <div className="mt-4">
        <h4 className="font-semibold">Summary</h4>
        <p>{data.summary || "Your summary will appear here..."}</p>
      </div>
    </div>
  );
}