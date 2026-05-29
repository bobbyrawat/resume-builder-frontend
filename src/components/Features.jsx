import { FaEdit, FaEye, FaDownload, FaBolt, FaLock, FaMobile } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaEdit />,
      title: "Smart Editor",
      desc: "AI-powered editing for fast resume creation"
    },
    {
      icon: <FaEye />,
      title: "Live Preview",
      desc: "See your resume update in real-time"
    },
    {
      icon: <FaDownload />,
      title: "Export Options",
      desc: "Download as PDF or other formats"
    },
    {
      icon: <FaBolt />,
      title: "Fast Performance",
      desc: "Build resumes in minutes"
    },
    {
      icon: <FaLock />,
      title: "Secure Data",
      desc: "Your information is safe and protected"
    },
    {
      icon: <FaMobile />,
      title: "Mobile Friendly",
      desc: "Works on all devices seamlessly"
    }
  ];

  return (
    <section className="px-12 py-20 text-center bg-gray-50">
      <h2 className="text-4xl font-bold">Everything You Need</h2>
      <p className="text-gray-500 mt-3">
        Powerful features to create professional resumes
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition hover:-translate-y-2"
          >
            <div className="text-3xl text-purple-600 mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-gray-500 mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;