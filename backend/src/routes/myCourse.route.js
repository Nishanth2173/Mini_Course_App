const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT c.id, c.title, c.description, c.price, s.price_paid, s.subscribed_at
       FROM app.subscriptions s JOIN app.courses c ON c.id = s.course_id
       WHERE s.user_id = $1
       ORDER BY s.subscribed_at DESC`,
      [userId]
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error("MY COURSES ERROR:", err.message);
    return res.status(500).json({ msg: "Failed to fetch my courses" });
  }
});

module.exports = router;