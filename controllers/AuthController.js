
const User = require("../Models/user");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res = response) => {
    try {

        let correo = req.body.correo;
        let password = req.body.password;
        const users = await User.findOne({ where: { email: correo } });
        if (await users?.validPassword(password)) {

            let token = await jwt.sign({ user: JSON.stringify(users.toJSON()) }, process.env.JWT_SECRET);
            return res.send({ token: token })
        }
        res.send({ msg: "Credenciales Incorrectas" });

    } catch (error) {
        console.log(error)
    }


}


const getAllUsuarios = async (req, res = response) => {
    const users = await User.findAll();
    res.send(users)
}

module.exports = {
    login,
    getAllUsuarios
}