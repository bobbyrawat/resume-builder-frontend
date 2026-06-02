export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      text: "This builder helped me land my dream job. Amazing experience!",
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      text: "Very easy to use and super fast. Loved the templates.",
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      text: "Clean UI and powerful features. Highly recommended.",
    },
  ];

  return (
    <section className="px-6 md:px-12 py-20 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold">Loved by Professionals</h2>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>

            <p className="mt-4 text-gray-600 italic">
              "{t.text}"
            </p>

            <h4 className="mt-4 font-semibold">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}