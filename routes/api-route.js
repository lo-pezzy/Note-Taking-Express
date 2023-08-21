const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const uuid = require("../helpers/uuid");

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get("/notes", (req, res) => {
  res.json(db);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
router.post("/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuid();
    db.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(db)
    );
    res.json(db);
    });

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    const newDb = db.filter((note) => note.id !== id);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(newDb)
    );
    res.json(newDb);
}
);