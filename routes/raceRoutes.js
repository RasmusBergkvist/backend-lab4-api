//Hämtar express och Race
const express = require("express");
const Race = require("../models/race");

const router = express.Router();

//Hämtar alla lopp
router.get("/", async (req, res) => {
    try {
        // Sortera efter datum
        const races = await Race.find().sort({ date: 1 });

        if (races.length === 0) {
            return res.status(404).json({ message: "No races stored in database" })
        }
        return res.json(races);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error: Failed to get data." });

    }
});

//Lägga till lopp.
router.post("/", async (req, res) => {
    try {
        const { name, date, distance, location, description, createdBy } = req.body;

        //Kontrollera att om loppet redan finns. 
        let isRegister = await Race.findOne({ name, date, location });

        if (isRegister) {
            return res.status(409).json({ message: "Race is already added." })
        }

        if (!name || !date || distance <= 0 || !location || !createdBy) {
            return res.status(400).json({ message: "Fill in required fields" });
        }

        //Skapar nytt lopp som ett objekt
        let newRace = await Race.create({ name, date, distance, location, description, createdBy });

        return res.status(201).json(newRace);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error. Failed to post race." })
    }

});

//Uppdatera lopp
router.put("/:id", async (req, res) => {
    try {

        let updateRace = await Race.updateOne({ _id: req.params.id }, { $set: req.body }, { runValidators: true });

        //Om inget matchat lopp hittas
        if (updateRace.matchedCount === 0) {
            return res.status(404).json({ message: "Race not found." });
        }

        return res.status(200).json({ message: "Race updated." })


    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: "Fill in required fields" });
        }


        return res.status(500).json({ error: "Internal server error. Failed to update race." })
    }
});

//Ta bort ett lopp
router.delete("/:id", async (req, res) => {
    try {
        let deleteRace = await Race.deleteOne({ _id: req.params.id });

        //Om inget resultat hittas
        if (deleteRace.deletedCount === 0) {
            return res.status(404).json({ message: "No race found." });
        }

        return res.status(200).json({ message: "Race deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error. Failed to delete race." });

    }
})


module.exports = router;