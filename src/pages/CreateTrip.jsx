


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function CreateTrip() {
//   const { token } = useAuth();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [destination, setDestination] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [memberEmails, setMemberEmails] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const emailsArray = memberEmails
//         .split(",")
//         .map((email) => email.trim())
//         .filter((email) => email !== "");

//       const res = await axios.post(
//         "http://localhost:5000/api/trips",
//         {
//           title,
//           description,
//           destination,
//           startDate,
//           endDate,
//           memberEmails: emailsArray,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data?._id) {
//         navigate(`/trip/${res.data._id}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to create trip.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="
//         min-h-screen
//         flex items-center justify-center
//         bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6]
//         px-3 sm:px-6
//         py-16 sm:py-20
//         mt-14 sm:mt-0
//         font-['Poppins']
//       "
//     >
//       <div
//         className="
//           w-full max-w-lg
//           bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90
//           border border-[#d4af37]/20
//           backdrop-blur-xl
//           rounded-2xl
//           shadow-2xl
//           p-6 sm:p-8
//         "
//       >
//         {/* Header */}
//         <h2
//           className="
//             text-2xl sm:text-3xl
//             font-bold text-center mb-5 sm:mb-6
//             font-['Playfair_Display']
//             bg-gradient-to-r from-[#f9f7e8] to-[#d4af37]
//             bg-clip-text text-transparent
//           "
//         >
//           ✈️ Create a New Trip
//         </h2>

//         {error && (
//           <p className="text-red-400 text-center mb-4 bg-red-950/40 py-2 rounded-xl border border-red-500/30 text-xs sm:text-sm">
//             {error}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
//           {/* Trip Title */}
//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
//               Trip Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="
//                 w-full bg-[#faf8f6]/10 text-[#f9f7e8]
//                 border border-[#d4af37]/40
//                 rounded-xl px-3 sm:px-4 py-2.5
//                 focus:ring-2 focus:ring-[#d4af37] outline-none
//                 placeholder-[#f9f7e8]/50 text-sm
//               "
//               placeholder="Enter trip title"
//               required
//             />
//           </div>

//           {/* Destination */}
//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
//               Destination
//             </label>
//             <input
//               type="text"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               className="
//                 w-full bg-[#faf8f6]/10 text-[#f9f7e8]
//                 border border-[#d4af37]/40
//                 rounded-xl px-3 sm:px-4 py-2.5
//                 focus:ring-2 focus:ring-[#d4af37] outline-none
//                 placeholder-[#f9f7e8]/50 text-sm
//               "
//               placeholder="e.g., Manali, Goa, Shimla"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="
//                 w-full bg-[#faf8f6]/10 text-[#f9f7e8]
//                 border border-[#d4af37]/40
//                 rounded-xl px-3 sm:px-4 py-2.5
//                 focus:ring-2 focus:ring-[#d4af37] outline-none
//                 placeholder-[#f9f7e8]/50 text-sm
//               "
//               placeholder="Enter description (optional)"
//               rows={3}
//             />
//           </div>

//           {/* Start Date */}
//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
//               Start Date
//             </label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="
//                 w-full bg-[#faf8f6]/10 text-[#f9f7e8]
//                 border border-[#d4af37]/40
//                 rounded-xl px-3 sm:px-4 py-2.5
//                 focus:ring-2 focus:ring-[#d4af37] outline-none text-sm
//               "
//               required
//             />
//           </div>

//           {/* End Date */}
//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
//               End Date
//             </label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="
//                 w-full bg-[#faf8f6]/10 text-[#f9f7e8]
//                 border border-[#d4af37]/40
//                 rounded-xl px-3 sm:px-4 py-2.5
//                 focus:ring-2 focus:ring-[#d4af37] outline-none text-sm
//               "
//               required
//             />
//           </div>

//           {/* Invite Members */}
//           <div>
//             <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
//               Invite Members (emails, comma separated)
//             </label>
//             <input
//               type="text"
//               value={memberEmails}
//               onChange={(e) => setMemberEmails(e.target.value)}
//               className="
//                 w-full bg-[#faf8f6]/10 text-[#f9f7e8]
//                 border border-[#d4af37]/40
//                 rounded-xl px-3 sm:px-4 py-2.5
//                 focus:ring-2 focus:ring-[#d4af37] outline-none
//                 placeholder-[#f9f7e8]/50 text-sm
//               "
//               placeholder="example1@mail.com, example2@mail.com"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="
//               w-full mt-2 sm:mt-3
//               bg-gradient-to-r from-[#d4af37] to-[#b8860b]
//               text-[#0f172a] font-semibold
//               py-2.5 rounded-xl
//               shadow-md hover:shadow-lg
//               hover:from-[#e6c85c] hover:to-[#d4af37]
//               transition-all text-sm sm:text-base
//               disabled:opacity-60
//             "
//           >
//             {loading ? "Creating..." : "Create Trip"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function CreateTrip() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [memberEmails, setMemberEmails] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const emailsArray = memberEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email !== "");

      const res = await axios.post(
        `${BACKEND_URL}/api/trips`,
        {
          title,
          description,
          destination,
          startDate,
          endDate,
          memberEmails: emailsArray,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?._id) {
        navigate(`/trip/${res.data._id}`);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6]
        px-3 sm:px-6
        py-16 sm:py-20
        mt-14 sm:mt-0
        font-['Poppins']
      "
    >
      <div
        className="
          w-full max-w-lg
          bg-gradient-to-b from-[#1e293b]/90 to-[#0f172a]/90
          border border-[#d4af37]/20
          backdrop-blur-xl
          rounded-2xl
          shadow-2xl
          p-6 sm:p-8
        "
      >
        {/* Header */}
        <h2
          className="
            text-2xl sm:text-3xl
            font-bold text-center mb-5 sm:mb-6
            font-['Playfair_Display']
            bg-gradient-to-r from-[#f9f7e8] to-[#d4af37]
            bg-clip-text text-transparent
          "
        >
          ✈️ Create a New Trip
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-4 bg-red-950/40 py-2 rounded-xl border border-red-500/30 text-xs sm:text-sm">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Trip Title */}
          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
              Trip Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full bg-[#faf8f6]/10 text-[#f9f7e8]
                border border-[#d4af37]/40
                rounded-xl px-3 sm:px-4 py-2.5
                focus:ring-2 focus:ring-[#d4af37] outline-none
                placeholder-[#f9f7e8]/50 text-sm
              "
              placeholder="Enter trip title"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="
                w-full bg-[#faf8f6]/10 text-[#f9f7e8]
                border border-[#d4af37]/40
                rounded-xl px-3 sm:px-4 py-2.5
                focus:ring-2 focus:ring-[#d4af37] outline-none
                placeholder-[#f9f7e8]/50 text-sm
              "
              placeholder="e.g., Manali, Goa, Shimla"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full bg-[#faf8f6]/10 text-[#f9f7e8]
                border border-[#d4af37]/40
                rounded-xl px-3 sm:px-4 py-2.5
                focus:ring-2 focus:ring-[#d4af37] outline-none
                placeholder-[#f9f7e8]/50 text-sm
              "
              placeholder="Enter description (optional)"
              rows={3}
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="
                w-full bg-[#faf8f6]/10 text-[#f9f7e8]
                border border-[#d4af37]/40
                rounded-xl px-3 sm:px-4 py-2.5
                focus:ring-2 focus:ring-[#d4af37] outline-none text-sm
              "
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="
                w-full bg-[#faf8f6]/10 text-[#f9f7e8]
                border border-[#d4af37]/40
                rounded-xl px-3 sm:px-4 py-2.5
                focus:ring-2 focus:ring-[#d4af37] outline-none text-sm
              "
              required
            />
          </div>

          {/* Invite Members */}
          <div>
            <label className="block text-xs sm:text-sm text-[#f9f7e8]/90 font-medium mb-1">
              Invite Members (emails, comma separated)
            </label>
            <input
              type="text"
              value={memberEmails}
              onChange={(e) => setMemberEmails(e.target.value)}
              className="
                w-full bg-[#faf8f6]/10 text-[#f9f7e8]
                border border-[#d4af37]/40
                rounded-xl px-3 sm:px-4 py-2.5
                focus:ring-2 focus:ring-[#d4af37] outline-none
                placeholder-[#f9f7e8]/50 text-sm
              "
              placeholder="example1@mail.com, example2@mail.com"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full mt-2 sm:mt-3
              bg-gradient-to-r from-[#d4af37] to-[#b8860b]
              text-[#0f172a] font-semibold
              py-2.5 rounded-xl
              shadow-md hover:shadow-lg
              hover:from-[#e6c85c] hover:to-[#d4af37]
              transition-all text-sm sm:text-base
              disabled:opacity-60
            "
          >
            {loading ? "Creating..." : "Create Trip"}
          </button>
        </form>
      </div>
    </div>
  );
}
