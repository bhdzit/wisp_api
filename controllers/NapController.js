const Nap = require("../Models/nap");
const OLT = require("../Models/olt");

const getNaps = async (req, res) => {
    const naps = await Nap.findAll({
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ], 
        include: [{
            model: OLT, as: "oltVO" // <---- HERE
        }]
    });
    res.send(naps)
}

const saveNaps = async (req, res) => {
    try {
        console.log(req.body);
        await Nap.create(req.body);
        const naps = await Nap.findAll();
        res.send(naps)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

const updateNaps = async (req, res) => {
    let id = req.body.id;
    try {
        await Nap.update(req.body, {
            where: {
                id: id
            }
        });

        const naps = await Nap.findAll();
        res.send(naps)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

const destroyNaps = async (req, res) => {
    let id = req.body.id;
    try {
        await Nap.destroy({
            where: {
                id: id
            }
        });

        const naps = await Nap.findAll();
        res.send(naps)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

module.exports = {
    getNaps,
    saveNaps,
    updateNaps,
    destroyNaps
}