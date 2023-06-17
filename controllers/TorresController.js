const Torre = require("../Models/torre");

const getTorres = async (req, res) => {
    const torres = await Torre.findAll({
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ]
    });
    res.send(torres)
}

const saveTorres = async (req, res) => {
    try {
        console.log(req.body);
        await Torre.create(req.body);
        const torres = await Torre.findAll();
        res.send(torres)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

const updateTorres = async (req, res) => {
    console.log("asdasd");
    let id = req.body.id;
    try {
        await Torre.update(req.body, {
            where: {
                id: id
            }
        });

        const torres = await Torre.findAll();
        res.send(torres)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

const destroyTorres = async (req, res) => {
    let id = req.body.id;
    try {
        await Torre.destroy({
            where: {
                id: id
            }
        });

        const torres = await Torre.findAll();
        res.send(torres)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

module.exports = {
    getTorres,
    saveTorres,
    updateTorres,
    destroyTorres
}