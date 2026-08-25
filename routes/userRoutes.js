//Hämtar express, jwt och User
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

//Registerar användare
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Validera användareuppgifter
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Fill in username, e-mail and password " });
        }

        //Skapar ny användare
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: "User created" });
    } catch (error) {
        //Kontroll av dubbletter.
        if (error.code === 11000) {
            return res.status(409).json({ error: "Username or email already registered" });
        }

        res.status(500).json({ error: "Internal server error: " + error })


    }
});

router.post("/login", async (req, res) => {
    try {
        //Hämtar användaruppgifter från input
        const { username, password } = req.body;

        //Validera användareuppgifter
        if (!username || !password) {
            return res.status(400).json({ message: "Fill in username, e-mail and password " });
        }

        //Letar upp användaren
        const user = await User.findOne({ username });

        //Om användaren inte finns
        if (!user) {
            return res.status(401).json({ error: "Incorrect username or password" });

        }

        //Jämför lösenord
        const passwordMatch = await user.comparePasswords(password);

        if (!passwordMatch) {
            //Om lösenord inte stämmer
            return res.status(401).json({ error: "Incorrect username or password" });
        }
        
        //Skapa token om användareuppgifterna stämmer
        const payload = {username: username};
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        const response = ({ message: "User logged in!", token: token})

        return res.status(200).json({response});

    } catch (error) {
        res.status(500).json({ error: "Internal server error: " + error });

    }

});

module.exports = router;
