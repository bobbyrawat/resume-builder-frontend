import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../config/api";

export default function ThemePage() {

  const { id } = useParams();

  const [resume, setResume] = useState(null);

  // selectedTheme removed (unused)

  const [pendingTheme, setPendingTheme] =
    useState("template1");

  //////////////////////////////////////////////////
  // LOAD
  //////////////////////////////////////////////////

  useEffect(() => {

    const loadResume = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response = await fetch(
          `${BASE_URL}/api/resume/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setResume(data);

        if (data?.template) {
          setPendingTheme(data.template);
        }

      } catch (error) {

        console.log(error);
      }
    };

    loadResume();

  }, [id]);

  //////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////

  const saveTheme = async (theme) => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/resume/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...resume,
            template: theme,
          }),
        }
      );

      if (!response.ok) {

        alert("Failed");

        return;
      }

      setResume((prev) => ({
        ...prev,
        template: theme,
      }));

      alert("Theme Applied");

    } catch (error) {

      console.log(error);
    }
  };

  //////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////

  if (!resume) {

    return (
      <div className="p-10 text-2xl">
        Loading...
      </div>
    );
  }

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////

  return (

    <div className="flex min-h-screen">

      {/* LEFT */}

      <div className="w-1/2 p-8 bg-white border-r">

        <h1 className="text-4xl font-bold mb-10">
          Choose Template
        </h1>

        <TemplateCard
          title="Template 1"
          active={
            pendingTheme === "template1"
          }
          onClick={() =>
            setPendingTheme("template1")
          }
        />

        <TemplateCard
          title="Template 2"
          active={
            pendingTheme === "template2"
          }
          onClick={() =>
            setPendingTheme("template2")
          }
        />

        <TemplateCard
          title="Template 3"
          active={
            pendingTheme === "template3"
          }
          onClick={() =>
            setPendingTheme("template3")
          }
        />

        <button
          onClick={() =>
            saveTheme(pendingTheme)
          }
          className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-xl font-bold"
        >
          Apply Template
        </button>

      </div>

      {/* RIGHT */}

      <div className="w-1/2 bg-gray-200 flex items-center justify-center p-10">

        {pendingTheme === "template1" && (
          <img
            src="/template2.jpg"
            alt="template1"
            className="w-[500px] rounded-3xl shadow-2xl"
          />
        )}

        {pendingTheme === "template2" && (
          <img
            src="/template1.webp"
            alt="template2"
            className="w-[500px] rounded-3xl shadow-2xl"
          />
        )}

        {pendingTheme === "template3" && (
          <img
            src="/template3.jpg"
            alt="template3"
            className="w-[500px] rounded-3xl shadow-2xl"
          />
        )}

      </div>

    </div>
  );
}

//////////////////////////////////////////////////
// CARD
//////////////////////////////////////////////////

function TemplateCard({
  title,
  active,
  onClick,
}) {

  return (

    <div
      onClick={onClick}
      className={`p-6 mb-6 rounded-2xl border-2 cursor-pointer transition-all
      ${
        active
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300"
      }`}
    >

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

    </div>
  );
}