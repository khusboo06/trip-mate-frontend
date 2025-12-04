


// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Card,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin } from "lucide-react";
// import emailjs from "@emailjs/browser";

// export default function Contact() {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//   const [sent, setSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     emailjs
//       .send(
//         "service_lyiz5gp",
//         "template_4q1hbvv",
//         {
//           from_name: formData.name,
//           from_email: formData.email,
//           message: formData.message,
//         },
//         "PoVVz6TXTY6zV-Wg3"
//       )
//       .then(() => {
//         setSent(true);
//         setLoading(false);
//         setFormData({ name: "", email: "", message: "" });
//       })
//       .catch((err) => {
//         console.error("❌ EmailJS Error:", err);
//         setLoading(false);
//       });
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(to bottom, #0f172a, #1e293b, #faf8f6)",
//         px: { xs: 2, sm: 4 },
//         py: { xs: 8, sm: 10 },
//         mt: { xs: 7, sm: 0 }, // similar offset behavior as register (for navbar)
//         fontFamily: "'Poppins', sans-serif",
//       }}
//     >
//       {/* Main Card (like Register) */}
//       <Box
//         component={motion.div}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         sx={{
//           width: "100%",
//           maxWidth: 1200,
//           background:
//             "linear-gradient(to bottom right, rgba(15,23,42,0.95), rgba(15,23,42,0.9))",
//           borderRadius: 4,
//           border: "1px solid rgba(212,175,55,0.3)",
//           boxShadow: "0 16px 45px rgba(0,0,0,0.55)",
//           p: { xs: 3, sm: 5 },
//           color: "#f9f7e8",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Soft glow background */}
//         <Box
//           sx={{
//             position: "absolute",
//             inset: 0,
//             background:
//               "radial-gradient(circle at top, rgba(212,175,55,0.25), transparent 60%)",
//             pointerEvents: "none",
//             zIndex: 0,
//           }}
//         />

//         {/* Content Wrapper */}
//         <Box sx={{ position: "relative", zIndex: 1 }}>
//           {/* Heading */}
//           <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5 } }}>
//             <Typography
//               sx={{
//                 fontWeight: 700,
//                 fontFamily: "'Playfair Display', serif",
//                 fontSize: { xs: "2rem", sm: "2.4rem" },
//                 mb: 1.5,
//                 background: "linear-gradient(90deg, #f9f7e8, #d4af37)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Get in Touch
//             </Typography>

//             <Typography
//               sx={{
//                 color: "#f9f7e8cc",
//                 fontSize: { xs: "0.9rem", sm: "1rem" },
//                 maxWidth: 520,
//                 mx: "auto",
//               }}
//             >
//               Have questions or feedback? We'd love to hear from you!
//             </Typography>
//           </Box>

//           {/* Cards Layout */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", md: "row" },
//               gap: { xs: 3, sm: 4, md: 5 },
//             }}
//           >
//             {/* Contact Info Card */}
//             <Card
//               sx={{
//                 flex: 1,
//                 mx: {xs:-1},
//                 p: { xs: 2.5, sm: 3, md: 3.5 },
//                 borderRadius: 3,
//                 background:
//                   "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
//                 backdropFilter: "blur(12px)",
//                 boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
//                 border: "1px solid rgba(212,175,55,0.35)",
//                 color: "#f9f7e8",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontWeight: 600,
//                   mb: 2.5,
//                   color: "#d4af37",
//                   fontSize: { xs: "1rem", sm: "1.05rem" },
//                 }}
//               >
//                 Contact Information
//               </Typography>

//               <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 2 }}>
//                 <Mail color="#d4af37" size={20} />
//                 <Typography sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" } }}>
//                   khushboo143002@gmail.com
//                 </Typography>
//               </Box>

//               <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 2 }}>
//                 <Phone color="#d4af37" size={20} />
//                 <Typography sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" } }}>
//                   +91 8757216981
//                 </Typography>
//               </Box>

//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <MapPin color="#d4af37" size={20} />
//                 <Typography sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" } }}>
//                   KIIT, India
//                 </Typography>
//               </Box>
//             </Card>

//             {/* Contact Form Card */}
//             <Card
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{
//                 flex: 1.5,
//                 mx: {xs:-1},
//                 p: { xs: 2.5, sm: 3, md: 3.5 },
//                 borderRadius: 3,
//                 background: "linear-gradient(180deg, #faf8f6, #f5f3ef, #ede9d9)",
//                 boxShadow:
//                   "0 8px 24px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.3)",
//                 border: "1px solid rgba(212,175,55,0.25)",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontWeight: 600,
//                   mb: 2.5,
//                   color: "#1e293b",
//                   fontFamily: "'Playfair Display', serif",
//                   fontSize: { xs: "1.05rem", sm: "1.15rem" },
//                 }}
//               >
//                 Send Us a Message
//               </Typography>

//               <TextField
//                 label="Your Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//                 required
//                 size="small"
//               />

//               <TextField
//                 label="Email Address"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//                 required
//                 size="small"
//               />

//               <TextField
//                 label="Message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 fullWidth
//                 multiline
//                 rows={4}
//                 margin="normal"
//                 required
//                 size="small"
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 disabled={loading}
//                 sx={{
//                   mt: 3,
//                   py: 1.3,
//                   fontWeight: "bold",
//                   fontSize: { xs: "0.9rem", sm: "1rem" },
//                   fontFamily: "'Poppins', sans-serif",
//                   borderRadius: "999px",
//                   background:
//                     "linear-gradient(90deg, #d4af37, #c3952d, #b8860b)",
//                   color: "#0f172a",
//                   "&:hover": {
//                     background:
//                       "linear-gradient(90deg, #e8c75c, #d4af37, #b8860b)",
//                   },
//                 }}
//               >
//                 {loading
//                   ? "Sending..."
//                   : sent
//                   ? "Message Sent ✅"
//                   : "Send Message"}
//               </Button>
//             </Card>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }



import React, { useState } from "react";
import { Box, Typography, TextField, Button, Card } from "@mui/material";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("❌ EmailJS Error:", err);
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #0f172a, #1e293b, #faf8f6)",
        px: { xs: 2, sm: 4 },
        py: { xs: 8, sm: 10 },
        mt: { xs: 7, sm: 0 },
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          width: "100%",
          maxWidth: 1200,
          background:
            "linear-gradient(to bottom right, rgba(15,23,42,0.95), rgba(15,23,42,0.9))",
          borderRadius: 4,
          border: "1px solid rgba(212,175,55,0.3)",
          boxShadow: "0 16px 45px rgba(0,0,0,0.55)",
          p: { xs: 3, sm: 5 },
          color: "#f9f7e8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top, rgba(212,175,55,0.25), transparent 60%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5 } }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: "2rem", sm: "2.4rem" },
                mb: 1.5,
                background: "linear-gradient(90deg, #f9f7e8, #d4af37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get in Touch
            </Typography>

            <Typography
              sx={{
                color: "#f9f7e8cc",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                maxWidth: 520,
                mx: "auto",
              }}
            >
              Have questions or feedback? We'd love to hear from you!
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, sm: 4, md: 5 },
            }}
          >
            <Card
              sx={{
                flex: 1,
                mx: { xs: -1 },
                p: { xs: 2.5, sm: 3, md: 3.5 },
                borderRadius: 3,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#f9f7e8",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 2.5,
                  color: "#d4af37",
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                }}
              >
                Contact Information
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 2 }}>
                <Mail color="#d4af37" size={20} />
                <Typography sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" } }}>
                  khushboo143002@gmail.com
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1.5, gap: 2 }}>
                <Phone color="#d4af37" size={20} />
                <Typography sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" } }}>
                  +91 8757216981
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <MapPin color="#d4af37" size={20} />
                <Typography sx={{ fontSize: { xs: "0.9rem", sm: "0.95rem" } }}>
                  KIIT, India
                </Typography>
              </Box>
            </Card>

            {/* Contact Form */}
            <Card
              component="form"
              onSubmit={handleSubmit}
              sx={{
                flex: 1.5,
                mx: { xs: -1 },
                p: { xs: 2.5, sm: 3, md: 3.5 },
                borderRadius: 3,
                background: "linear-gradient(180deg, #faf8f6, #f5f3ef, #ede9d9)",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.3)",
                border: "1px solid rgba(212,175,55,0.25)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 2.5,
                  color: "#1e293b",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: "1.05rem", sm: "1.15rem" },
                }}
              >
                Send Us a Message
              </Typography>

              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                size="small"
              />

              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                size="small"
              />

              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                required
                size="small"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, #d4af37, #c3952d, #b8860b)",
                  color: "#0f172a",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #e8c75c, #d4af37, #b8860b)",
                  },
                }}
              >
                {loading ? "Sending..." : sent ? "Message Sent ✅" : "Send Message"}
              </Button>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
