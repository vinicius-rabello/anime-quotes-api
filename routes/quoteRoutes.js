const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// GET: Obter todos os exercícios
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM processed_quotes.merged_darling_in_the_franxx ORDER BY random() LIMIT 1"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TODO: filtrar por character conhecido
// // GET: Obter um único exercício
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT * FROM exercises WHERE id = $1", [id]);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
