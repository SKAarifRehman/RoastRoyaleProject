// // // utils/gemini.js

// // const { GoogleGenerativeAI } = require('@google/generative-ai');
// // require('dotenv').config(); // Load environment variables

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use environment variable for safety

// // async function generateRoastAI(playerOne, playerTwo) {
// //   try {
// //    const promptText = `Give me a short, one-liner roast from ${playerOne} to ${playerTwo}. It should be funny, lighthearted, and under 15 words.`;

// //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// //     const result = await model.generateContent(promptText);
// //     const response = await result.response;

// //     return response.text();
// //   } catch (error) {
// //     console.error("AI roast generation failed:", error);
// //     return `${playerOne} tried roasting ${playerTwo}, but the AI was too stunned to speak! 🤖🔥`;
// //   }
// // }

// // module.exports = { generateRoastAI };




// const { GoogleGenerativeAI } = require('@google/generative-ai');
// require('dotenv').config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function generateRoastAI(from = "AI", to = "user") {
//   try {
//     const promptText = `Roast this user in a short, one-liner under 15 words. Be lighthearted and funny.`;

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const result = await model.generateContent(promptText);
//     const response = await result.response;

//     return response.text().trim();
//   } catch (error) {
//     console.error("AI roast generation failed:", error);
//     return `AI was too stunned to reply! 🤖🔥`;
//   }
// }

// module.exports = { generateRoastAI };



const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI replies to user's roast
async function generateRoastAI(userName = "User") {
  try {
    const prompt = `Reply with a short, one-liner roast to a user. Keep it funny and under 15 words.`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error("AI roast generation failed:", error);
    return `AI is speechless! 🤖🔥`;
  }
}

// Gemini judges the roast battle
async function judgeRoastBattle(userRoast, aiRoast) {
  try {
    const prompt = `
      You're a neutral judge in a roast battle. 

      User's roast: "${userRoast}"
      AI's roast: "${aiRoast}"

      Who roasted better? Reply only with "User" or "AI".`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const verdict = response.text().trim();
    if (verdict.toLowerCase().includes("user")) return "User";
    if (verdict.toLowerCase().includes("ai")) return "AI";
    return "AI"; // fallback
  } catch (error) {
    console.error("AI judge failed:", error);
    return "AI";
  }
}

module.exports = {
  generateRoastAI,
  judgeRoastBattle,
};
