const { readFileSync } = require('fs');
require('dotenv').config();
const getClietneName = (pagos) => {

  return pagos[0]?.clienteVO.cliente.toUpperCase();
}

const meses=["Ene", "Feb", "Mar" , "Abr" , "May" , "Jun" , "Jul" , "Ago" ,  "Sep" , "Oct" , "Nov" , "Dic"];

const getFechaDePago = (pagos) => {
  let fecha = new Date(pagos[0]?.createdAt);
  return formatoDosCeros(fecha.getDate()) + "-" + formatoDosCeros(fecha.getMonth() + 1) + "-" + fecha.getFullYear();
}

const getCorteDeServicio = (pagos) => {
  let ultimoMesPagado = pagos[pagos.length - 1]?.mesPagado;
  let mesPagado = new Date((ultimoMesPagado?.split("-")[0] * 1), ((ultimoMesPagado?.split("-")[1] * 1)));

  return formatoDosCeros(mesPagado.getDate()) + "-" + meses[(mesPagado.getMonth() )] + "-" + mesPagado.getFullYear();
}

const formatoDosCeros = (str) => {
  return ("00" + str).slice(-2)
}

const getPagos = (listaDePagos) => {
  let pagos = "";
  listaDePagos.map((pago, index) => {
    pagos += `<label style="display: block; text-align: left;">Servicio No:  ${("0000" + pago.clienteVO.id).slice(-4)}</label>
        <label style="display: block; text-align: left;">Mes Pagado: ${meses[(pago.mesPagado.split("-")[1])-1]}-${pago.mesPagado.split("-")[0]}</label>
        <label style="display: block; text-align: left;">Plan: ${pago.paqueteVO.name}</label>
        <label style="display: block; text-align: left;">Mesualidad:  $ ${pago.costo}</label>`;
    if (index < listaDePagos.length - 1) pagos += "<br>";

  });
  return pagos;
}

const getExtras = (pagos) => {
 
  let extras = `<h5 style="border-top: 2px solid #000;border-bottom: 2px solid #000;" >Extras</h5>`;
  let numOfExtras=pagos.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.extraVO.length * 1),
    0,
  )
  console.log(numOfExtras);
  pagos.map(pago=>{
    pago.extraVO.map(extra=>{
      extras+= `<label style="display: block; text-align: left;">Descripcion:  ${extra.descripcion}</label>`;
      extras+= `<label style="display: block; text-align: left;">Costo: $ ${extra.costo}</label><p></p>`;
    });
  })
  if(!numOfExtras) return "";
  return extras+"<p></p>"; 
}

const getTotal = (pagos) => {
  let sum = pagos.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.costo * 1),
    0,
  );
  pagos.map(pago=>{
    sum = pago.extraVO.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.costo * 1),
      sum,
    );
  
  })
  

  return sum;

}

const pdfView = (pagos) => {
  let nombreDeCliente = getClietneName(pagos);
  let fechaDelPAgo = getFechaDePago(pagos);
  let corteDeServicio = getCorteDeServicio(pagos);
  let pagosHtml = getPagos(pagos);
  let total = getTotal(pagos);
  let extras=getExtras(pagos);

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title></title>
    <style>
    html{
    width: 100%;
    height: 100%;
    padding: 0;
    margin-left:   5px;

    }
    h5,h3{
      padding: 0;
      margin:   5px;
    }
    label{
      font-size: 10px;
      margin:   5px;
    }
    </style>
  </head>
  <body >
    <div  style="margin: 0px;width: 100%;">

<center>
  <img style="width:100px" src="data:image/png;base64,${readFileSync(process.env.LOCAL_FRONT+"/assets/img/logo2.png").toString('base64')}">
    <br>
    <br>
    <label>ZONA ON</label><br>
    <label>EMILIANO ZAPATA 22</label>
    <br>
    <label>772 114 5890</label><br>

      <h5 style="border-top: 2px solid #000;border-bottom: 2px solid #000;" >COMPROBANTE DE PAGO</h5>
      <h5><b>${nombreDeCliente}<b/></h5>
      <label style="font-size:16px; border-bottom: 2px solid #000;">Fecha de pago: ${fechaDelPAgo}</label>
      <p></p>
      ${pagosHtml} 
      <p></p>  
      ${extras}
  <h5 style="border-top: 2px solid #000;border-bottom: 2px solid #000;" ><strong>Corte de servicio a partir del <br>${corteDeServicio}<strong/></h5>
  <label style="display: block; text-align: left;">Total : $ ${total} </label>
  <p style="border-top: 2px solid #000; padding:unset;"></p>
<label>* GRACIAS POR
  SU PREFERENCIA* </label>
  
</div>
  </body>
</html>`;
}

module.exports = {
  pdfView
}