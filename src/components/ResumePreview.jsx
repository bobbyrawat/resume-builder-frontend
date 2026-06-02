export default function ResumePreview({ data }) {
  if (!data) return null;

  return (
    <div className="p-6 border rounded-xl bg-blue-50 min-h-[400px]">
      
      {/* NAME */}
      <h2 className="text-xl font-bold">
        {data.profileInfo?.fullName || "Your Name"}
      </h2>

      {/* TITLE */}
      <p className="text-gray-600">
        {data.profileInfo?.designation || "Your Title"}
      </p>

      {/* SUMMARY */}
      <div className="mt-4">
        <h4 className="font-semibold">Summary</h4>
        <p className="text-gray-700">
          {data.profileInfo?.summary || "Your summary will appear here..."}
        </p>
      </div>

      {/* SKILLS */}
      <div className="mt-4">
        <h4 className="font-semibold">Skills</h4>
        <ul className="list-disc ml-5 text-gray-700">
          {data.skills?.map((s, i) => (
            <li key={i}>{s.name}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}