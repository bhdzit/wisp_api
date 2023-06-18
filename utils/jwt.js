
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validateJWT = function (req, res, next) {

    // Put some preprocessing here.
    let { url } = req;
    if (!url.includes("api") || url == "/api/auth/login") {
        next();
        return;
    }

    try {
        let token = req.headers.authorization;
        token = token?.replace("Bearer ", "");
        let isValideToken = jwt.verify(token, process.env.JWT_SECRET);
        if (req.headers.authorization != undefined) next();

    } catch (error) {
        res.status(403).send({ msg: "Parece que no tienes permiso" });
    }

}


module.exports = validateJWT;