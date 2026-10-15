const jwt = require("jsonwebtoken");


//Middleware för authentisering
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null)  return res.status(401).json({message: "Not authorized for this route. You need to send token" });
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if(error) return res.status(403).json({message: "Invalid JWT-token"});

        req.username = user.username;

         next();
    });
}

module.exports = authenticateToken;