// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import express from "express";
// import morgan from "morgan";
// import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
// import routes from "./routes/index.js";
// import { dbConnection } from "./utils/index.js";

// dotenv.config();

// dbConnection();

// const PORT = process.env.PORT || 5000;

// const app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:3001"],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use(morgan("dev"));
// app.use("/api", routes);

// app.use(routeNotFound);
// app.use(errorHandler);

// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

// app.use(cors());
// app.use(express.json());
// const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

// app.post('/api/chat', async (req, res) => {
//   const { message } = req.body;

//   if (!message) {
//     return res.status(400).json({ error: 'Message is required' });
//   }

//   try {
//     const payload = {
//       contents: [
//         {
//           role: 'user',
//           parts: [
//             {
//               text: `
// You're a smart and efficient chatbot. Reply based on what the user is asking:

// - If the user asks for a summary, give a clear and concise summary.
// - If the user asks for a list (e.g., top places, steps, tools), reply in bullet points, one point per line.
// - If the user asks a direct question, give a direct, no-fluff answer.
// - Do not restate the question.
// - Do not add unnecessary explanations or extra wording.
// - Keep your answers human, clean, and to the point.

// User: ${message}
// Bot:
//               `.trim(),
//             },
//           ],
//         },
//       ],
//     };

//     const { data } = await axios.post(GEMINI_API_URL, payload, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
//     res.json({ reply });

//   } catch (error) {
//     console.error('Gemini API Error:', error?.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to connect to Gemini API' });
//   }
// });

// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// // });
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import axios from "axios";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

dotenv.config();
dbConnection();

const app = express();
const PORT = process.env.PORT || 8800;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Other API routes
app.use("/api", routes);

// Gemini Chatbot API
app.post('/api/chat', async (req, res) => {
  console.log('💬 Received chat request');

  const { chatHistory } = req.body;

  if (!chatHistory || !Array.isArray(chatHistory)) {
    return res.status(400).json({ error: 'chatHistory is required and must be an array' });
  }

  const formattedMessages = chatHistory.map(msg => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}`).join('\n');

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `
You are a smart assistant. Here is the conversation history:

${formattedMessages}

Reply to the user's latest message accurately.
            `.trim(),
          },
        ],
      },
    ],
  };

  try {
    const { data } = await axios.post(GEMINI_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.json({ reply });

  } catch (error) {
    console.error('❌ Gemini API Error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to connect to Gemini API' });
  }
});

// 404 and Error handlers
app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT}`));
