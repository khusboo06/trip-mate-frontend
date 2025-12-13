



// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { ArrowLeftCircle, Plus, User } from "lucide-react";
// import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

// const BACKEND_URL = "http://localhost:5000";

// export default function PollsPage() {
//   const { id } = useParams();
//   const { token, user } = useAuth();
//   const navigate = useNavigate();
//   const [polls, setPolls] = useState([]);
//   const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPolls = async () => {
//       try {
//         const res = await axios.get(`${BACKEND_URL}/api/polls/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPolls(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching polls:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolls();
//   }, [id, token]);

//   const addOption = () =>
//     setNewPoll((prev) => ({ ...prev, options: [...prev.options, ""] }));

//   const handleOptionChange = (idx, value) => {
//     const options = [...newPoll.options];
//     options[idx] = value;
//     setNewPoll((prev) => ({ ...prev, options }));
//   };

//   const createPollHandler = async () => {
//     if (!newPoll.question.trim()) return alert("Poll question cannot be empty");
//     if (newPoll.options.some((opt) => !opt.trim()))
//       return alert("All poll options must be filled");

//     try {
//       const res = await axios.post(
//         `${BACKEND_URL}/api/polls`,
//         { tripId: id, question: newPoll.question, options: newPoll.options },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPolls((prev) => [...prev, res.data]);
//       setNewPoll({ question: "", options: ["", ""] });
//     } catch (err) {
//       console.error("Error creating poll:", err);
//       alert(err.response?.data?.message || "Error creating poll");
//     }
//   };

//   const vote = async (pollId, optionIndex) => {
//     try {
//       const res = await axios.post(
//         `${BACKEND_URL}/api/polls/${pollId}/vote`,
//         { optionIndex },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPolls((prev) => prev.map((p) => (p._id === pollId ? res.data : p)));
//     } catch (err) {
//       alert(err.response?.data?.message || "Error voting");
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-[#d4af37] text-lg font-['Poppins']">
//         Loading polls...
//       </p>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] text-[#f9f7e8] font-['Poppins'] px-3 sm:px-6 py-8 sm:py-16 mt-14 sm:mt-0">
//       <div className="max-w-7xl mx-auto">
//         {/* 🟨 Header Card */}
//         <div className="relative bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl shadow-2xl px-4 sm:px-8 py-8 backdrop-blur-xl mb-10 mt-4">
//           {/* Mobile: only arrow (top-left) */}
//           <button
//             onClick={() => navigate(`/trip/${id}`)}
//             className="absolute top-3 left-3 p-0 bg-transparent text-[#d4af37] sm:hidden"
//           >
//             <ArrowLeftCircle size={22} />
//           </button>

//           {/* Desktop / Tablet: pill Back button (top-right) */}
//           <button
//             onClick={() => navigate(`/trip/${id}`)}
//             className="absolute top-5 right-5 hidden sm:flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all border border-[#d4af37]/40"
//           >
//             <ArrowLeftCircle size={18} />
//             Back
//           </button>

//           <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
//             Trip Polls 🗳️
//           </h1>
//           <p className="text-center text-[#f9f7e8]/80 text-sm sm:text-base">
//             Create and vote on trip-related decisions
//           </p>
//         </div>

//         {/* Layout */}
//         <div className="grid gap-8 md:grid-cols-2">
//           {/* Create Poll Section */}
//           <div className="bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xl">
//             <h2 className="text-2xl font-semibold mb-5 text-[#d4af37] font-['Playfair_Display']">
//               Create a New Poll
//             </h2>

//             <input
//               type="text"
//               placeholder="Enter poll question..."
//               value={newPoll.question}
//               onChange={(e) =>
//                 setNewPoll({ ...newPoll, question: e.target.value })
//               }
//               className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 mb-3 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none text-sm sm:text-base"
//             />

//             {newPoll.options.map((opt, idx) => (
//               <input
//                 key={idx}
//                 type="text"
//                 placeholder={`Option ${idx + 1}`}
//                 value={opt}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//                 className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 mb-2 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none text-sm sm:text-base"
//               />
//             ))}

//             <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-5">
//               <button
//                 onClick={addOption}
//                 className="flex items-center justify-center gap-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] px-4 py-2 rounded-lg text-sm font-medium border border-[#d4af37]/40 transition"
//               >
//                 <Plus size={16} /> Add Option
//               </button>
//               <button
//                 onClick={createPollHandler}
//                 className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all text-sm sm:text-base"
//               >
//                 Create Poll
//               </button>
//             </div>
//           </div>

//           {/* Active Polls Section */}
//           <div className="bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xl max-h-[80vh] overflow-y-auto">
//             <h2 className="text-2xl font-semibold mb-6 text-[#d4af37] font-['Playfair_Display']">
//               Active Polls
//             </h2>

//             {polls.length === 0 ? (
//               <p className="text-[#f9f7e8]/70 italic text-center mt-10 text-sm sm:text-base">
//                 No polls yet. Create one!
//               </p>
//             ) : (
//               <div className="space-y-8">
//                 {polls.map((poll) => {
//                   const hasVoted = poll.options.some((o) =>
//                     o.votes?.includes(user?._id)
//                   );
//                   const totalVotes = poll.options.reduce(
//                     (sum, o) => sum + (o.votes?.length || 0),
//                     0
//                   );

//                   const data = poll.options.map((opt, index) => ({
//                     name: opt.text,
//                     votes: opt.votes?.length || 0,
//                     color: [
//                       "#34d399",
//                       "#60a5fa",
//                       "#fbbf24",
//                       "#f87171",
//                       "#a78bfa",
//                       "#ec4899",
//                     ][index % 6],
//                   }));

//                   return (
//                     <div
//                       key={poll._id}
//                       className="border border-[#d4af37]/40 rounded-2xl p-4 sm:p-5 bg-[#faf8f6]/5 hover:bg-[#faf8f6]/10 transition-all shadow-md"
//                     >
//                       <h3 className="text-base sm:text-lg font-semibold text-[#f9f7e8] mb-4">
//                         {poll.question}
//                       </h3>

//                       {/* Chart */}
//                       {totalVotes > 0 ? (
//                         <div className="flex flex-col items-center">
//                           <div className="w-full h-48 sm:h-52">
//                             <ResponsiveContainer width="100%" height="100%">
//                               <BarChart data={data}>
//                                 <XAxis
//                                   dataKey="name"
//                                   tick={{ fontSize: 10, fill: "#f9f7e8" }}
//                                 />
//                                 <Bar
//                                   dataKey="votes"
//                                   radius={[10, 10, 0, 0]}
//                                 >
//                                   {data.map((entry, index) => (
//                                     <Cell
//                                       key={index}
//                                       fill={entry.color}
//                                     />
//                                   ))}
//                                 </Bar>
//                               </BarChart>
//                             </ResponsiveContainer>
//                           </div>

//                           <div className="flex justify-between w-full mt-3 px-2 sm:px-3">
//                             {data.map((entry, idx) => (
//                               <div
//                                 key={idx}
//                                 className="flex flex-col items-center"
//                               >
//                                 <User
//                                   size={16}
//                                   color={entry.color}
//                                   className="opacity-80"
//                                 />
//                                 <span className="text-[10px] sm:text-xs text-[#f9f7e8] mt-1">
//                                   {entry.votes}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ) : (
//                         <p className="text-[#f9f7e8]/60 text-sm italic">
//                           No votes yet
//                         </p>
//                       )}

//                       {/* Vote Buttons */}
//                       <div className="mt-4 flex flex-wrap gap-2">
//                         {poll.options.map((opt, idx) => {
//                           const optionText =
//                             typeof opt === "string" ? opt : opt.text;
//                           return (
//                             <button
//                               key={idx}
//                               onClick={() => vote(poll._id, idx)}
//                               disabled={hasVoted}
//                               className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all ${
//                                 hasVoted
//                                   ? "bg-[#faf8f6]/10 border-[#f9f7e8]/10 text-[#f9f7e8]/40 cursor-not-allowed"
//                                   : "bg-[#d4af37]/20 border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/30"
//                               }`}
//                             >
//                               {optionText}
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom divider like other pages */}
//         <div className="mt-10 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ArrowLeftCircle, Plus, User } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

// ✅ Use env backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function PollsPage() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/polls/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPolls(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching polls:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, [id, token]);

  const addOption = () =>
    setNewPoll((prev) => ({ ...prev, options: [...prev.options, ""] }));

  const handleOptionChange = (idx, value) => {
    const options = [...newPoll.options];
    options[idx] = value;
    setNewPoll((prev) => ({ ...prev, options }));
  };

  const createPollHandler = async () => {
    if (!newPoll.question.trim()) return alert("Poll question cannot be empty");
    if (newPoll.options.some((opt) => !opt.trim()))
      return alert("All poll options must be filled");

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/polls`,
        { tripId: id, question: newPoll.question, options: newPoll.options },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPolls((prev) => [...prev, res.data]);
      setNewPoll({ question: "", options: ["", ""] });
    } catch (err) {
      console.error("Error creating poll:", err);
      alert(err.response?.data?.message || "Error creating poll");
    }
  };

  const vote = async (pollId, optionIndex) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/polls/${pollId}/vote`,
        { optionIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPolls((prev) => prev.map((p) => (p._id === pollId ? res.data : p)));
    } catch (err) {
      alert(err.response?.data?.message || "Error voting");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-[#d4af37] text-lg font-['Poppins']">
        Loading polls...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#faf8f6] text-[#f9f7e8] font-['Poppins'] px-3 sm:px-6 py-8 sm:py-16 mt-14 sm:mt-0">
      <div className="max-w-7xl mx-auto">
        {/* 🟨 Header Card */}
        <div className="relative bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl shadow-2xl px-4 sm:px-8 py-8 backdrop-blur-xl mb-10 mt-4">
          {/* Mobile: only arrow (top-left) */}
          <button
            onClick={() => navigate(`/trip/${id}`)}
            className="absolute top-3 left-3 p-0 bg-transparent text-[#d4af37] sm:hidden"
          >
            <ArrowLeftCircle size={22} />
          </button>

          {/* Desktop / Tablet: pill Back button (top-right) */}
          <button
            onClick={() => navigate(`/trip/${id}`)}
            className="absolute top-14 right-5 hidden sm:flex items-center gap-2 bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all border border-[#d4af37]/40"
          >
            <ArrowLeftCircle size={18} />
            Back
          </button>

          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 font-['Playfair_Display'] bg-gradient-to-r from-[#f9f7e8] to-[#d4af37] bg-clip-text text-transparent">
            Trip Polls 🗳️
          </h1>
          <p className="text-center text-[#f9f7e8]/80 text-sm sm:text-base">
            Create and vote on trip-related decisions
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Create Poll Section */}
          <div className="bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-5 text-[#d4af37] font-['Playfair_Display']">
              Create a New Poll
            </h2>

            <input
              type="text"
              placeholder="Enter poll question..."
              value={newPoll.question}
              onChange={(e) =>
                setNewPoll({ ...newPoll, question: e.target.value })
              }
              className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 mb-3 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none text-sm sm:text-base"
            />

            {newPoll.options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="w-full bg-[#faf8f6]/10 text-[#f9f7e8] border border-[#d4af37]/40 rounded-xl px-4 py-2.5 mb-2 placeholder-[#f9f7e8]/50 focus:ring-2 focus:ring-[#d4af37] outline-none text-sm sm:text-base"
              />
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-5">
              <button
                onClick={addOption}
                className="flex items-center justify-center gap-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] px-4 py-2 rounded-lg text-sm font-medium border border-[#d4af37]/40 transition"
              >
                <Plus size={16} /> Add Option
              </button>
              <button
                onClick={createPollHandler}
                className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:from-[#e6c85c] hover:to-[#d4af37] transition-all text-sm sm:text-base"
              >
                Create Poll
              </button>
            </div>
          </div>

          {/* Active Polls Section */}
          <div className="bg-gradient-to-b from-[#1e293b]/80 to-[#0f172a]/90 border border-[#d4af37]/30 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6 text-[#d4af37] font-['Playfair_Display']">
              Active Polls
            </h2>

            {polls.length === 0 ? (
              <p className="text-[#f9f7e8]/70 italic text-center mt-10 text-sm sm:text-base">
                No polls yet. Create one!
              </p>
            ) : (
              <div className="space-y-8">
                {polls.map((poll) => {
                  const hasVoted = poll.options.some((o) =>
                    o.votes?.includes(user?._id)
                  );
                  const totalVotes = poll.options.reduce(
                    (sum, o) => sum + (o.votes?.length || 0),
                    0
                  );

                  const data = poll.options.map((opt, index) => ({
                    name: opt.text,
                    votes: opt.votes?.length || 0,
                    color: [
                      "#34d399",
                      "#60a5fa",
                      "#fbbf24",
                      "#f87171",
                      "#a78bfa",
                      "#ec4899",
                    ][index % 6],
                  }));

                  return (
                    <div
                      key={poll._id}
                      className="border border-[#d4af37]/40 rounded-2xl p-4 sm:p-5 bg-[#faf8f6]/5 hover:bg-[#faf8f6]/10 transition-all shadow-md"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-[#f9f7e8] mb-4">
                        {poll.question}
                      </h3>

                      {/* Chart */}
                      {totalVotes > 0 ? (
                        <div className="flex flex-col items-center">
                          <div className="w-full h-48 sm:h-52">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={data}>
                                <XAxis
                                  dataKey="name"
                                  tick={{ fontSize: 10, fill: "#f9f7e8" }}
                                />
                                <Bar
                                  dataKey="votes"
                                  radius={[10, 10, 0, 0]}
                                >
                                  {data.map((entry, index) => (
                                    <Cell
                                      key={index}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="flex justify-between w-full mt-3 px-2 sm:px-3">
                            {data.map((entry, idx) => (
                              <div
                                key={idx}
                                className="flex flex-col items-center"
                              >
                                <User
                                  size={16}
                                  color={entry.color}
                                  className="opacity-80"
                                />
                                <span className="text-[10px] sm:text-xs text-[#f9f7e8] mt-1">
                                  {entry.votes}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[#f9f7e8]/60 text-sm italic">
                          No votes yet
                        </p>
                      )}

                      {/* Vote Buttons */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {poll.options.map((opt, idx) => {
                          const optionText =
                            typeof opt === "string" ? opt : opt.text;
                          return (
                            <button
                              key={idx}
                              onClick={() => vote(poll._id, idx)}
                              disabled={hasVoted}
                              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all ${
                                hasVoted
                                  ? "bg-[#faf8f6]/10 border-[#f9f7e8]/10 text-[#f9f7e8]/40 cursor-not-allowed"
                                  : "bg-[#d4af37]/20 border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/30"
                              }`}
                            >
                              {optionText}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom divider like other pages */}
        <div className="mt-10 w-full h-[2px] bg-gradient-to-r from-[#d4af37]/40 via-[#f9f7e8]/20 to-[#d4af37]/40" />
      </div>
    </div>
  );
}
