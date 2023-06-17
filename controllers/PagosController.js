const { Op, literal, Sequelize } = require("sequelize");
const Pago = require("../Models/pago");
const Extra = require("../Models/extra");
const Cliente = require("../Models/cliente");
const pdf = require('html-pdf');
const { pdfView } = require("../utils/pdfView");
const Paquete = require("../Models/paquete");
const realizarPagos = async (req, res) => {
    try {
        let listaDePagos = [];
        let listaDeExtra = [];
        await Promise.all(req.body?.listaDePagos.map(async item => {
            let pago = item;
            pago["cliente"] = item.cliente.id;
            console.log(pago);
            let pagoRealizado = await Pago.create(pago);
            listaDePagos.push(pagoRealizado);
            console.log(pagoRealizado);
        }));

        if (listaDePagos.length > 0) {
            let primerPago = listaDePagos[0];
            console.log(primerPago.id);
            await Promise.all(req.body?.listaDeExtras.map(async extra => {
                extra["pago"] = primerPago.id;
                console.log(extra);
                await Extra.create(extra);
            }));

        }


        //const Pagos = await Pago.findAll();
        console.log(listaDePagos)
        res.send(listaDePagos)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const getPagosDeCliente = async (req, res) => {
    try {
        let cliente = req.body.cliente;
        const Pagos = await Pago.findAll({ where: { cliente: cliente } });
        res.send(Pagos)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}
const getPagosDelMes = async (req, res) => {
    try {
        let mesPagado = req.query.mesPagado;
        const Pagos = await Pago.findAll({
            where: { mesPagado: mesPagado }
        });
        res.send(Pagos)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

const validarReferencia = async (req, res) => {
    try {
        let referencia = req.query.referencia;
        let pagos = await Pago.findAll({
            where: {
                referencia: {
                    [Op
                        .like]: "%" + referencia + "%"
                }
            },
            include: [{
                model: Cliente, as: "clienteVO" // <---- HERE
            }]
        });
        console.log(pagos);
        res.send({ esRefereciaValida: pagos.length == 0, coincidencia: pagos })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}


const generarPDF = async (req, res) => {
    try {

        let pagoId = req.query.pago;
        const pagoPrincipal = await Pago.findAll({
            where: { id: pagoId }
        });

        let fechaDePago = formatoDeFecha(pagoPrincipal[0].createdAt);
        let fechaFin = formatoDeFecha(pagoPrincipal[0].createdAt);
        fechaFin = new Date(fechaFin.setDate(fechaFin.getDate() + 1));
        console.log(fechaDePago);
        console.log(fechaFin);

        let listaDePagos = await Pago.findAll({
            where: {
                cliente: pagoPrincipal[0].cliente,
                createdAt: {
                    [Op.gt]: fechaDePago,
                    [Op.lt]: fechaFin
                }
            }, 
            include: [
                {
                    model: Cliente, as: "clienteVO" // <---- HERE
                },
                {
                    model: Paquete, as: "paqueteVO" // <---- HERE
                },
                {
                    model: Extra, as: "extraVO" // <---- HERE
                }],

        })

        console.log(listaDePagos);

        var contenido = pdfView(listaDePagos);
        await pdf.create(contenido, { width: "170px", height: tamanoDePantalla(listaDePagos), format: null }).toBuffer(function (err, buffer) {
            if (err) return res.send(err);
            res.type('pdf');
            res.end(buffer, 'binary');
        });
        //  res.send(pdfGenerado);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

const tamanoDePantalla = (pagos) => {
    let tamano = 100;
    let numOfExtras=pagos.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.extraVO.length * 1),
        0,
      )
    tamano += ((pagos.length + 1) * 90) +(numOfExtras*50) +100;
    return tamano + "px";
}

const formatoDeFecha = (fecha) => {
    return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}


module.exports = {
    realizarPagos,
    getPagosDeCliente,
    validarReferencia,
    getPagosDelMes,
    generarPDF
}