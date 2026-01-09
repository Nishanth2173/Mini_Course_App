const router = require("express").Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth"); // ✅ ADD THIS

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    const userExists = await pool.query(
      "SELECT id FROM app.users WHERE email=$1",
      [email]
    );

    if (userExists.rows.length)
      return res.status(409).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO app.users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name || null, email, hashedPassword]
    );

    res.status(201).json({
      msg: "Signup successful",
      user: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    const result = await pool.query(
      "SELECT * FROM app.users WHERE email=$1",
      [email]
    );

    if (!result.rows.length)
      return res.status(401).json({ msg: "Invalid credentials" });

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/change-password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      msg: "Current password and new password required"
    });
  }

  try {
    const result = await pool.query(
      "SELECT password FROM app.users WHERE id = $1",
      [userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ msg: "User not found" });
    }

    const hashedPassword = result.rows[0].password;
    const isMatch = await bcrypt.compare(
      currentPassword,
      hashedPassword
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Current password is incorrect"
      });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE app.users SET password = $1 WHERE id = $2",
      [newHashedPassword, userId]
    );

    res.json({
      msg: "Password updated successfully"
    });

  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;