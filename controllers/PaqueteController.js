const Paquete = require("../Models/paquete");

const getPaquetes = async (req, res) => {
    const Paquetes = await Paquete.findAll({
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ]
    });
    res.send(Paquetes)
}

const savePaquete = async (req, res) => {
    try {
        await Paquete.create(req.body);
        const Paquetes = await Paquete.findAll();
        res.send(Paquetes)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const updatePaquete = async (req, res) => {
    console.log("asdasd");
    let id = req.body.id;
    try {
        await Paquete.update(req.body, {
            where: {
                id: id
            }
        });

        const Paquetes = await Paquete.findAll();
        res.send(Paquetes)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const destroyPaquete = async (req, res) => {
    let id = req.body.id;
    try {
        await Paquete.destroy({
            where: {
                id: id
            }
        });

        const Paquetes = await Paquete.findAll();
        res.send(Paquetes)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

module.exports = {
    getPaquetes,
    savePaquete,
    updatePaquete,
    destroyPaquete
}