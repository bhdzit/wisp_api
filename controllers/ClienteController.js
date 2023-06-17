const Cliente = require("../Models/cliente");
const Paquete = require("../Models/paquete");
const Sector = require("../Models/sector");
const Torre = require("../Models/torre");

const getClientes = async (req, res) => {
    const Clientes = await Cliente.findAll({
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ],
        include: [{
            model: Torre, as: "torresVO" // <---- HERE
        },
        {
            model: Paquete, as: "paqueteVO" // <---- HERE
        }]
    });
    res.send(Clientes)
}

const saveCliente = async (req, res) => {
    try {
        await Cliente.create(req.body);
        const Clientes = await Cliente.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['id', 'ASC'],
            ],
            include: [{
                model: Torre, as: "torresVO" // <---- HERE
            },
            {
                model: Paquete, as: "paqueteVO" // <---- HERE
            }]
        });
        res.send(Clientes)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const updateCliente = async (req, res) => {

    let id = req.body.id;
    try {
        await Cliente.update(req.body, {
            where: {
                id: id
            }
        });

        const Clientes = await Cliente.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['id', 'ASC'],
            ],
            include: [{
                model: Torre, as: "torresVO" // <---- HERE
            },
            {
                model: Paquete, as: "paqueteVO" // <---- HERE
            }]
        });
        res.send(Clientes)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const destroyCliente = async (req, res) => {
    let id = req.body.id;
    try {
        await Cliente.update({ estatus: false }, {
            where: {
                id: id
            }
        });
        const Clientes = await Cliente.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['id', 'ASC'],
            ],
            include: [{
                model: Torre, as: "torresVO" // <---- HERE
            },
            {
                model: Paquete, as: "paqueteVO" // <---- HERE
            }]
        });
        res.send(Clientes)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const suspenderCliente = async (req, res) => {
    let id = req.body.id;
    try {
        await Cliente.update({ estatus: null }, {
            where: {
                id: id
            }
        });
        const Clientes = await Cliente.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['id', 'ASC'],
            ],
            include: [{
                model: Torre, as: "torresVO" // <---- HERE
            },
            {
                model: Paquete, as: "paqueteVO" // <---- HERE
            }]
        });
        res.send(Clientes)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getClientesSuspendidos = async (req, res) => {
    const Clientes = await Cliente.findAll({
        where: {
            estatus: null
        },
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ],
        include: [{
            model: Torre, as: "torresVO" // <---- HERE
        },
        {
            model: Paquete, as: "paqueteVO" // <---- HERE
        }]
    });
    res.send(Clientes)
}
const activarCliente = async (req, res) => {
    let id = req.body.id;
    console.log(id);
    await Cliente.scope("activeUsers").update({ estatus: true }, {
        where: {
            id: id
        }
    });
    const Clientes = await Cliente.findAll({
        where: {
            estatus: null
        },
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ],
        include: [{
            model: Torre, as: "torresVO" // <---- HERE
        },
        {
            model: Paquete, as: "paqueteVO" // <---- HERE
        }]
    });
    res.send(Clientes)
}

module.exports = {
    getClientes,
    saveCliente,
    updateCliente,
    destroyCliente,
    suspenderCliente,
    getClientesSuspendidos,
    activarCliente
}