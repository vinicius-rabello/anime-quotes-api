const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// GET: Get a random quote
router.get("/", async (req, res) => {
  try {
    const hasKnownCharacter = req.query.known === "true";

    // Build the query based on the known parameter
    let random_table_query = "SELECT table_name FROM staging.has_known_character";
    if (hasKnownCharacter) {
      random_table_query += " WHERE has_known_character IS TRUE";
    }
    random_table_query += " ORDER BY random() LIMIT 1";

    // Get random table name
    const tableResult = await pool.query(random_table_query);

    if (tableResult.rows.length === 0) {
      return res.status(404).json({ error: "No tables found" });
    }

    const randomTableName = tableResult.rows[0].table_name;

    // Then, get a random quote from the selected table
    let random_quote_query = `SELECT * FROM raw_quotes.${randomTableName}`;
    if (hasKnownCharacter) {
      random_quote_query += " WHERE name <> 'Unknown' AND name <> 'NTP'";
    }
    random_quote_query += " ORDER BY random() LIMIT 1";

    const quoteResult = await pool.query(random_quote_query);

    if (quoteResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No quotes found in selected table"});
    }

    res.status(200).json(quoteResult.rows[0]);
  } catch (err) {
    console.error("Error fetching random quote:", err);
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
