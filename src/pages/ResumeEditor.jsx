import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import BASE_URL from "../config/api";


export default function ResumeEditor() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [resume, setResume] =
    useState(null);

  //////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////

  useEffect(() => {

    const fetchResume =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await fetch(
              `${BASE_URL}/api/resume/${id}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          setResume({
            ...data,

            template:
              data.template ||
              "template1",

            profileInfo:
              data.profileInfo ||
              {},

            contactInfo:
              data.contactInfo ||
              {},

            skills:
              data.skills || [],

            workExperiences:
              data.workExperiences ||
              [],

            education:
              data.education ||
              [],

            certifications:
              data.certifications || [],

            languages:
              data.languages || [],

            projects:
              data.projects || [],

            profileImage:
              data.profileImage || "",

            customSections:
              data.customSections || [],
          });

        } catch (error) {

          console.log(error);
        }
      };

    fetchResume();

  }, [id]);

  //////////////////////////////////////////////////
  // STYLE
  //////////////////////////////////////////////////

  const currentStyle = {

    leftBg: "bg-white",

    input:
      "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-black outline-none",

    button:
      "bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold",
  };

  //////////////////////////////////////////////////
  // CHANGE
  //////////////////////////////////////////////////

  const handleChange = (
    section,
    field,
    value
  ) => {

    setResume((prev) => ({
      ...prev,

      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  //////////////////////////////////////////////////
  // ARRAY CHANGE
  //////////////////////////////////////////////////

  const handleArrayChange = (
    section,
    index,
    field,
    value
  ) => {

    const updated = [
      ...resume[section],
    ];

    updated[index][field] =
      value;

    setResume({
      ...resume,
      [section]: updated,
    });
  };

  //////////////////////////////////////////////////
  // ADD ITEM
  //////////////////////////////////////////////////

  const addItem = (
    section,
    template
  ) => {

    setResume({
      ...resume,

      [section]: [
        ...resume[section],
        template,
      ],
    });
  };

  //////////////////////////////////////////////////
  // IMAGE UPLOAD
  //////////////////////////////////////////////////

  const handleImageUpload =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend =
        () => {

          setResume({
            ...resume,
            profileImage:
              reader.result,
          });
        };

      reader.readAsDataURL(
        file
      );
    };

  //////////////////////////////////////////////////
  // CUSTOM SECTION
  //////////////////////////////////////////////////

  const addCustomSection =
    (title) => {

      if (!title.trim())
        return;

      setResume({
        ...resume,

        customSections: [
          ...resume.customSections,

          {
            title,
            items: [],
          },
        ],
      });
    };

  const addCustomItem =
    (sectionIndex) => {

      const updated =
        [
          ...resume.customSections,
        ];

      updated[
        sectionIndex
      ].items.push({
        name: "",
      });

      setResume({
        ...resume,
        customSections:
          updated,
      });
    };

  const handleCustomItemChange =
    (
      sectionIndex,
      itemIndex,
      value
    ) => {

      const updated =
        [
          ...resume.customSections,
        ];

      updated[
        sectionIndex
      ].items[itemIndex]
        .name = value;

      setResume({
        ...resume,
        customSections:
          updated,
      });
    };

  //////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////

  const handleSave = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          `${BASE_URL}/api/resume/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              resume
            ),
          }
        );

      if (!res.ok) {

        console.log(
          await res.text()
        );

        return;
      }

      alert("Saved ✅");

    } catch (error) {

      console.log(error);
    }
  };

  //////////////////////////////////////////////////
  // DELETE
  //////////////////////////////////////////////////

  const handleDelete =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          `${BASE_URL}/api/resume/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (!res.ok) {

        console.log(
          await res.text()
        );

        return;
      }

      navigate("/dashboard");
    };

  //////////////////////////////////////////////////
  // DOWNLOAD
  //////////////////////////////////////////////////

  const handleDownload =
    () => {

      const content =
        document.getElementById(
          "resume-preview"
        ).innerHTML;

      const win =
        window.open(
          "",
          "",
          "width=1400,height=1000"
        );

      win.document.write(`
        <html>

        <head>

          <title>
            Resume
          </title>

          <script src="https://cdn.tailwindcss.com"></script>

          <style>

            body{
              margin:0;
              padding:20px;
              background:white;
              font-family:Arial;
            }

          </style>

        </head>

        <body>

          ${content}

        </body>

        </html>
      `);

      win.document.close();

      setTimeout(() => {
        win.print();
      }, 500);
    };

  //////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////

  if (!resume) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////

  return (

    <div className="flex flex-col lg:flex-row min-h-screen overflow-hidden">

      {/* LEFT SIDE */}

    <div
  className={`w-full lg:w-1/2 overflow-y-auto p-5 lg:p-8 ${currentStyle.leftBg}`}
>

        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl font-bold mb-10">
            Resume Editor
          </h1>

          {/* PROFILE */}

          <SectionTitle title="Profile" />

          <div className="space-y-4 border-b pb-8 mb-8">

            <input
              className={currentStyle.input}
              placeholder="Full Name"
              value={
                resume.profileInfo
                  ?.fullName || ""
              }
              onChange={(e) =>
                handleChange(
                  "profileInfo",
                  "fullName",
                  e.target.value
                )
              }
            />

            <input
              className={currentStyle.input}
              placeholder="Designation"
              value={
                resume.profileInfo
                  ?.designation || ""
              }
              onChange={(e) =>
                handleChange(
                  "profileInfo",
                  "designation",
                  e.target.value
                )
              }
            />

            <textarea
              className={`${currentStyle.input} min-h-[120px]`}
              placeholder="Summary"
              value={
                resume.profileInfo
                  ?.summary || ""
              }
              onChange={(e) =>
                handleChange(
                  "profileInfo",
                  "summary",
                  e.target.value
                )
              }
            />

          </div>

          {/* CONTACT */}

          <SectionTitle title="Contact" />

          <div className="space-y-4 border-b pb-8 mb-8">

            <input
              className={currentStyle.input}
              placeholder="Phone"
              value={
                resume.contactInfo
                  ?.phone || ""
              }
              onChange={(e) =>
                handleChange(
                  "contactInfo",
                  "phone",
                  e.target.value
                )
              }
            />

            <input
              className={currentStyle.input}
              placeholder="Email"
              value={
                resume.contactInfo
                  ?.email || ""
              }
              onChange={(e) =>
                handleChange(
                  "contactInfo",
                  "email",
                  e.target.value
                )
              }
            />

            <input
              className={currentStyle.input}
              placeholder="Location"
              value={
                resume.contactInfo
                  ?.location || ""
              }
              onChange={(e) =>
                handleChange(
                  "contactInfo",
                  "location",
                  e.target.value
                )
              }
            />

          </div>

          {/* SKILLS */}

          <SectionTitle title="Skills" />

          <div className="space-y-4 border-b pb-8 mb-8">

            {resume.skills?.map(
              (skill, index) => (

                <input
                  key={index}
                  className={currentStyle.input}
                  placeholder="Skill"
                  value={skill.name}
                  onChange={(e) =>
                    handleArrayChange(
                      "skills",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
              )
            )}

            <button
              onClick={() =>
                addItem(
                  "skills",
                  {
                    name: "",
                  }
                )
              }
              className={currentStyle.button}
            >
              + Add Skill
            </button>

          </div>

          {/* LANGUAGES */}

          <SectionTitle title="Languages" />

          <div className="space-y-4 border-b pb-8 mb-8">

            {resume.languages?.map(
              (lang, index) => (

                <input
                  key={index}
                  className={currentStyle.input}
                  placeholder="Language"
                  value={lang.name}
                  onChange={(e) =>
                    handleArrayChange(
                      "languages",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
              )
            )}

            <button
              onClick={() =>
                addItem(
                  "languages",
                  {
                    name: "",
                  }
                )
              }
              className={currentStyle.button}
            >
              + Add Language
            </button>

          </div>

          {/* PROJECTS */}

          <SectionTitle title="Projects" />

          <div className="space-y-6 border-b pb-8 mb-8">

            {resume.projects?.map(
              (project, index) => (

                <div
                  key={index}
                  className="space-y-4 p-4 border rounded-xl"
                >

                  <input
                    className={currentStyle.input}
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) =>
                      handleArrayChange(
                        "projects",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                  />

                  <textarea
                    className={`${currentStyle.input} min-h-[100px]`}
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) =>
                      handleArrayChange(
                        "projects",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />

                </div>
              )
            )}

            <button
              onClick={() =>
                addItem(
                  "projects",
                  {
                    title: "",
                    description: "",
                  }
                )
              }
              className={currentStyle.button}
            >
              + Add Project
            </button>

          </div>

          {/* CREATE NEW SECTION */}

          <SectionTitle title="Create New Section" />

          <div className="space-y-4 border-b pb-8 mb-8">

            <input
              id="newSectionInput"
              className={currentStyle.input}
              placeholder="Enter Section Title"
            />

            <button
              onClick={() => {

                const input =
                  document.getElementById(
                    "newSectionInput"
                  );

                addCustomSection(
                  input.value
                );

                input.value = "";
              }}
              className={currentStyle.button}
            >
              + Create Section
            </button>

          </div>

          {/* CUSTOM SECTIONS */}

          {resume.customSections?.map(
            (
              section,
              sectionIndex
            ) => (

              <div
                key={sectionIndex}
                className="space-y-4 border-b pb-8 mb-8"
              >

                <SectionTitle
                  title={section.title}
                />

                {section.items?.map(
                  (
                    item,
                    itemIndex
                  ) => (

                    <input
                      key={itemIndex}
                      className={currentStyle.input}
                      placeholder={`Add ${section.title}`}
                      value={item.name}
                      onChange={(e) =>
                        handleCustomItemChange(
                          sectionIndex,
                          itemIndex,
                          e.target.value
                        )
                      }
                    />
                  )
                )}

                <button
                  onClick={() =>
                    addCustomItem(
                      sectionIndex
                    )
                  }
                  className={currentStyle.button}
                >
                  + Add {section.title}
                </button>

              </div>
            )
          )}

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-4 mt-10 mb-20">

            <button
              onClick={handleSave}
              className={currentStyle.button}
            >
              Save
            </button>

            <button
              onClick={() =>
                navigate(`/theme/${id}`)
              }
              className={currentStyle.button}
            >
              Designs
            </button>

            <button
              onClick={handleDownload}
              className={currentStyle.button}
            >
              Download
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold"
            >
              Delete
            </button>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}

    <div className="w-full lg:w-1/2 overflow-y-auto bg-gray-200 flex justify-center p-3 lg:p-6">

        <div
          id="resume-preview"
          className="scale-[0.70] origin-top"
        >

          <div className="w-[780px] min-h-[1200px] bg-white flex shadow-2xl">

            {/* LEFT SIDEBAR */}

      <div
  className={`w-[32%] border-r p-8 ${
    resume.template === "template2"
      ? "bg-pink-300 border-pink-500"
      : resume.template === "template3"
      ? "bg-[#303030] border-[#303030] text-white"
      : "bg-[#f3f3f3] border-gray-700"
  }`}
>


              {/* IMAGE */}

              <div className="flex justify-center">

                <label className="cursor-pointer">

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={
                      handleImageUpload
                    }
                  />

                  {resume.profileImage ? (

                    <img
                      src={
                        resume.profileImage
                      }
                      alt=""
                      className="w-40 h-40 rounded-full object-cover border border-black"
                    />

                  ) : (

                    <div className="w-40 h-40 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 text-center p-4">

                      Click To Upload Photo

                    </div>

                  )}

                </label>

              </div>

              {/* CONTACT */}

              <div className="mt-8 pb-6 border-b border-gray-700">

                <h2 className="text-2xl font-bold uppercase mb-4">
                  Contact
                </h2>

                <div className="space-y-2 text-base break-words">

                  <p>
                    {resume.contactInfo?.phone}
                  </p>

                  <p>
                    {resume.contactInfo?.email}
                  </p>

                  <p>
                    {resume.contactInfo?.location}
                  </p>

                </div>

              </div>

              {/* SKILLS */}

              <div className="mt-8 pb-6 border-b border-gray-700">

                <h2 className="text-2xl font-bold uppercase mb-4">
                  Skills
                </h2>

                <ul className="space-y-2 text-base">

                  {resume.skills?.map((skill, i) => (

                    <li key={i}>
                      • {skill.name}
                    </li>

                  ))}

                </ul>

              </div>

              {/* LANGUAGES */}

              <div className="mt-8 pb-6 border-b border-gray-700">

                <h2 className="text-2xl font-bold uppercase mb-4">
                  Languages
                </h2>

                <ul className="space-y-2 text-base">

                  {resume.languages?.map((lang, i) => (

                    <li key={i}>
                      • {lang.name}
                    </li>

                  ))}

                </ul>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="flex-1 p-10 bg-white">

              {/* HEADER */}

              <div
  className={`pb-6 border-b p-6 ${
    resume.template === "template3"
      ? "bg-[#C8C4AB] border-[#303030]"
      : "border-gray-700"
  }`}
>

                <h1 className="text-5xl font-bold uppercase">

                  {resume.profileInfo?.fullName}

                </h1>

                <p className="text-2xl text-gray-600 mt-3">

                  {resume.profileInfo?.designation}

                </p>

              </div>

              {/* SUMMARY */}

              <div className="mt-8 pb-8 border-b border-gray-700">

                <h2 className="text-3xl font-bold uppercase mb-4">
                  Summary
                </h2>

                <p className="text-lg leading-8 text-gray-700">

                  {resume.profileInfo?.summary}

                </p>

              </div>

              {/* EXPERIENCE */}

              <div className="mt-8 pb-8 border-b border-gray-700">

                <h2 className="text-3xl font-bold uppercase mb-6">
                  Experience
                </h2>

                <div className="space-y-8">

                  {resume.workExperiences?.map((exp, i) => (

                    <div key={i}>

                      <h3 className="text-2xl font-bold">
                        {exp.role}
                      </h3>

                      <p className="text-lg font-semibold mt-1">
                        {exp.company}
                      </p>

                      <p className="text-base mt-3 leading-7 text-gray-700">
                        {exp.description}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

              {/* PROJECTS */}

              <div className="mt-8 pb-8 border-b border-gray-700">

                <h2 className="text-3xl font-bold uppercase mb-6">
                  Projects
                </h2>

                <div className="space-y-8">

                  {resume.projects?.map((project, i) => (

                    <div key={i}>

                      <h3 className="text-2xl font-bold">
                        {project.title}
                      </h3>

                      <p className="text-base mt-3 leading-7 text-gray-700">
                        {project.description}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

              {/* CUSTOM SECTIONS */}

              {resume.customSections?.map(
                (section, i) => (

                  <div
                    key={i}
                    className="mt-8 pb-8 border-b border-gray-700"
                  >

                    <h2 className="text-3xl font-bold uppercase mb-4">

                      {section.title}

                    </h2>

                    <ul className="space-y-2 text-base">

                      {section.items?.map(
                        (
                          item,
                          index
                        ) => (

                          <li key={index}>

                            • {item.name}

                          </li>
                        )
                      )}

                    </ul>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

//////////////////////////////////////////////////
// TITLE
//////////////////////////////////////////////////

function SectionTitle({
  title,
}) {

  return (

    <h2 className="text-2xl font-bold mb-5">
      {title}
    </h2>

  );
}