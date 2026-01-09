const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");


router.post("/", auth, async (req, res) => {
  const { courseId, promoCode } = req.body;
  const userId = req.user.id;

  try {
    // 1. Get course
    const courseResult = await pool.query(
      "SELECT id, price FROM app.courses WHERE id = $1",[courseId]);

    if (!courseResult.rows.length) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const coursePrice = Number(courseResult.rows[0].price);
    let pricePaid = coursePrice;

    // 2. Paid course → validate promo
    if (coursePrice > 0) {
      if (promoCode !== "BFSALE25") {
        return res.status(400).json({ msg: "Invalid promo code" });
      }
      pricePaid = coursePrice / 2;
    }

    // 3. Insert subscription
    await pool.query(
      `INSERT INTO app.subscriptions (user_id, course_id, price_paid)
       VALUES ($1, $2, $3)`,[userId, courseId, pricePaid]);

    return res.status(201).json({
      msg: "Subscribed successfully",
      pricePaid});

  } catch (err) {
    // Duplicate subscription error
    if (err.code === "23505") {
      return res.status(409).json({ msg: "Already subscribed" });
    }

    console.error("SUBSCRIBE ERROR:", err.message);
    return res.status(500).json({ msg: "Subscription failed" });
  }
});


module.exports = router;
