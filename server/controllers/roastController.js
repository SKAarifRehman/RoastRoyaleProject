const Roast = require("../models/Roast");
const { generateRoastAI,judgeRoastBattle } = require("../utils/gemini"); // this is your real AI file
// exports.createRoast = async (req, res) => {
//  const { player1, player2 } = req.body;

//   try {
//     // Generate AI roasts
//     const roast1 = await generateRoastAI(player1, player2);
//     const roast2 = await generateRoastAI(player2, player1);

//     // Create roast entry
//     const newRoast = await Roast.create({
//       player1: { id: player1, roast: roast1 },
//       player2: { id: player2, roast: roast2 },
//     });

//     // Fetch the roast again to populate fields
//     const populatedRoast = await Roast.findById(newRoast._id)
//       .populate("player1.id", "name avatar")
//       .populate("player2.id", "name avatar");

//     res.status(201).json({ success: true, roast: populatedRoast });

//   } catch (error) {
//     console.error("Roast Generation Error:", error);
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

// Get all roasts


// exports.createRoast = async (req, res) => {
//   const { userId, userRoast } = req.body;

//   try {
//     // AI generates a comeback
//     const aiRoast = await generateRoastAI("AI", "user");

//     // Create roast entry
//     const newRoast = await Roast.create({
//       user: { id: userId, userRoast: userRoast },
//       ai: { aiRoast: aiRoast },
//     });

//     // Populate user info
//     const populatedRoast = await Roast.findById(newRoast._id)
//       .populate("user.id", "name avatar");

//     res.status(201).json({ success: true, roast: populatedRoast });
//   } catch (error) {
//     console.error("Roast Creation Error:", error);
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

exports.createRoast = async (req, res) => {
  const { userRoast, userId } = req.body;

  try {
    const aiRoast = await generateRoastAI();
    const winner = await judgeRoastBattle(userRoast, aiRoast);

    const newRoast = await Roast.create({
      user: userId,
      userRoast,
      aiRoast,
      winner,
    });

    const populatedRoast = await newRoast.populate("user", "name avatar");

    res.status(201).json({
      success: true,
      message: `${winner} wins the roast battle!`,
      roast: populatedRoast,
    });
  } catch (error) {
    console.error("Roast creation failed:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// exports.getRoasts = async (req, res) => {
//   try {
//     const roasts = await Roast.find()
//       .populate("player1.id", "name avatar")
//       .populate("player2.id", "name avatar")
//       .populate("winner", "name avatar");

//     res.status(200).json({ success: true, roasts });
//   } catch (error) {
//     res.status(500).json({ success: false, msg: error.message });
//   }
// };

// Manually set the winner

exports.getRoasts = async (req, res) => {
  try {
    const roasts = await Roast.find()
      .populate("user", "name avatar") // populate user only
      .sort({ createdAt: -1 }); // optional: latest first

    res.status(200).json({ success: true, roasts });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};





// exports.setWinner = async (req, res) => {
//   const { roastId, winnerId } = req.body;

//   try {
//     const updated = await Roast.findByIdAndUpdate(
//       roastId,
//       { winner: winnerId },
//       { new: true }
//     );

//     res.status(200).json({ success: true, updated });
//   } catch (err) {
//     res.status(500).json({ success: false, msg: err.message });
//   }
// };