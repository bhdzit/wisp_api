const OLT = require("../Models/olt");

const getOlts = async (req, res) => {
    const olts = await OLT.findAll({
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ]
    });
    res.send(olts)
}

const saveOlts = async (req, res) => {
    try {
        await OLT.create(req.body);
        const olts = await OLT.findAll();
        res.send(olts)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

const updateOlts = async (req, res) => {
    let id = req.body.id;
    try {
        await OLT.update(req.body, {
            where: {
                id: id
            }
        });

        const olts = await OLT.findAll();
        res.send(olts)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

const destroyOlts = async (req, res) => {
    let id = req.body.id;
    try {
        await OLT.destroy({
            where: {
                id: id
            }
        });

        const olts = await OLT.findAll();
        res.send(olts)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

module.exports = {
    getOlts,
    saveOlts,
    updateOlts,
    destroyOlts
}