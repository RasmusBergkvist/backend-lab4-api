const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Användarschema
const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }

});

//Hasha lösenord innan det sparas
userSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            //Sparar det hashade lösenordet
            this.password = hashedPassword;
        }
        
        next();
    } catch (error) {
        next(error)
    }

});

//Skapar användare
userSchema.statics.register = async function (username, email, password) {
    try {
        //Skapar nytt användare-objekt
        const user = new this({ username, email, password });
        //Sparar ny användare
        await user.save();

        return user;
    } catch (error) {
        throw error;
    }
}

//Jämför lösenord
userSchema.methods.comparePasswords = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

//Inloggning
userSchema.statics.login = async function(username, password) {
    try {
        //Hämtar användaren
        const user = await this.findOne({username});

        //Kontroll om användaren finns i databasen
        if(!user) {
            throw new Error("Felaktigt användarnamn eller lösenord")
        }

        //Jämför lösenord
         const passwordMatch = await user.comparePasswords(password);
         //Om angivet lösenord inte stämmer
         if (!passwordMatch) {
            throw new Error("Felaktigt användarnamn eller lösenord");
         }

         return user;
    } catch (error) {
        throw error 
    }
}

const User = mongoose.model("User", userSchema);

//Exportera User
module.exports = User;