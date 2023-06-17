const Sector = require("../Models/sector");
const Torre = require("../Models/torre");

const getSector = async (req, res) => {
    try {
        const Sectors = await Sector.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['id', 'ASC'],
            ],
            include: Torre
        });
        res.send(Sectors)
    } catch (error) {
        res.status(500).send();
    }

}

const saveSector = async (req, res) => {
    try {
        await Sector.create(req.body);
        const Sectors = await Sector.findAll();
        res.send(Sectors)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

const updateSector = async (req, res) => {

    let id = req.body.id;
    try {
        await Sector.update(req.body, {
            where: {
                id: id
            }
        });

        const Sectors = await Sector.findAll();
        res.send(Sectors)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

const destroySector = async (req, res) => {
    let id = req.body.id;
    try {
        await Sector.destroy({
            where: {
                id: id
            }
        });

        const Sectors = await Sector.findAll();
        res.send(Sectors)
    } catch (error) {
        console.log(error);
        res.status(501).send(error);
    }
}

module.exports = {
    getSector,
    saveSector,
    updateSector,
    destroySector
}