const express = require("express");
const router = require("express").Router();
const pool = require("../config/db");

/* ===================== GET ALL COURSES ===================== */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM app.courses
       ORDER BY title`);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("COURSES FETCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ===================== GET COURSE BY ID ===================== */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM app.courses
       WHERE id = $1`,[id]);

    if (!result.rows.length)
      return res.status(404).json({ message: "Course not found" });

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("COURSE FETCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;