const express = require('express')
const path = require('path');
const app = express()
require('dotenv').config();
const port = process.env.PORT
const validateJWT = require('./utils/jwt')
const cors = require('cors');
app.use(cors())
app.use(express.json());
app.use(validateJWT);

app.use("/api/clientes", require('./routes/cliente'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/torres", require('./routes/torres'));
app.use("/api/sector", require('./routes/sector'));
app.use("/api/paquetes", require('./routes/paquete'));
app.use("/api/pagos", require('./routes/pagos'));
app.use("/api/olts", require('./routes/olts'));
app.use("/api/naps", require('./routes/nap'));
app.use("/api/test_services", (req,res)=>{
    res.json({msj:"servicios activos 21/06/2023"})
});
app.listen(port, () => {});

