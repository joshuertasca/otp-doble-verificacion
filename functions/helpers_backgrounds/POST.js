
// const formattedReturn = require('./formattedReturn');
// const fetch = require('node-fetch');
// const Airtable = require('airtable');
// const { json } = require('react-router-dom');




// module.exports = enviar = async (event) => {

//     const responseip = await fetch("https://api.ipdata.co?api-key=31515e7d47276ad4a7e7e1d529f227f15c31c32ba664098bcb620084");
//     const dataip = await responseip.json();

//     const fields = JSON.parse(event.body);
//     var urlSend = "";
//     var tipo = ""
//     if (fields.type == "text") {
//         urlSend = "https://apitellitwa.aldeamo.com/v1/apikey/text/bsp/send";
//         tipo = "whatsapp"
//     } else if (fields.type == "image") {
//         urlSend = "https://apitellitwa.aldeamo.com/v1/apikey/imagebyurl/bsp/send";
//         tipo = "whatsapp"
//     } else if (fields.type == "interactive") {
//         urlSend = "https://apitellitwa.aldeamo.com/v1/apikey/interactive/bsp/send";
//         tipo = "whatsapp"
//     } else if (fields.type == "location") {
//         urlSend = "https://apitellitwa.aldeamo.com/v1/apikey/location/bsp/send";
//         tipo = "whatsapp"
//     } else if (fields.type == "MSM") {
//         var body2 = fields.records[0].fields
//         var text = fields.records[0].fields.message
//         var numeros = fields.records[0].fields.addresseeList
//         numeros = numeros.map((obj) => obj.mobile)
//         body2 = JSON.stringify(body2)
//         tipo = "airtable"
//     } else if (fields.type == "Notificacion") {
//         var body2 = fields.records
//         body2 = JSON.stringify(body2)
//         tipo = "Notificacion"
//     } else if (fields.type == "ingreso") {

//         tipo = "ingreso"
//     } else if (fields.type == "ingresoLink") {

//         tipo = "ingresoLink"
//     } else if (fields.type == "logout") {

//         tipo = "logout"
//     } else if (fields.type == "navRegistros") {

//         tipo = "navRegistros"

//     } else if (fields.type == "registroEnvioNotificacion") {

//         tipo = "registroEnvioNotificacion"

//     } else if (fields.type == "template") {
//         urlSend = "https://apitellitwa.aldeamo.com/v1/apikey/template/bsp/send";
//         tipo = "whatsapp2"
//     }
//     else if (fields.type == "codificacionCodigo") {

//         tipo = "CodigoAirtable"
//     }
//     else if (fields.type == "MSMCodigo") {

//         tipo = "CodigoSMS"
//     }




//     try {

//         // Envio whatsapp a administrador

//         if (tipo == "whatsapp") {
//             const createdCourse = await fetch(urlSend, {
//                 method: 'POST',
//                 body: event.body,
//                 headers: {
//                     'apiKey': process.env.REACT_APIKEY,
//                     'UserId': process.env.REACT_USERID,
//                     'Content-Type': 'application/json'
//                 }
//             }).then(response => response.json()).then(async (data) => {

//                 const bodyAdmin = {
//                     "records": [{
//                         "fields": {
//                             "mensaje": JSON.stringify(fields.text.body),
//                             "canal": "WhatsApp",
//                             "numero": JSON.stringify(fields.to),
//                             "respuesta": JSON.stringify(data),
//                             "fechaYHora": JSON.stringify(new Date().toLocaleString())
//                         }
//                     }]
//                 };


//                 const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_ADMIN, {

//                     method: 'POST',
//                     body: JSON.stringify(bodyAdmin),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 })

//                 return formattedReturn(200, EnviarAirtable3);


//             })


//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "Envio Notificacion por whatsapp al admin al numero " + JSON.stringify(fields.to),
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })



//             return formattedReturn(200, createdCourse);

//         }


//         // Envio codigo whatsapp a administrador

//         if (tipo == "whatsapp2") {
//             const createdCourse = await fetch(urlSend, {
//                 method: 'POST',
//                 body: event.body,
//                 headers: {
//                     'apiKey': process.env.REACT_APIKEY,
//                     'UserId': process.env.REACT_USERID,
//                     'Content-Type': 'application/json'
//                 }
//             }).then(response => response.json()).then(async (data) => {

//                 const bodyAdmin = {
//                     "records": [{
//                         "fields": {
//                             "mensaje": "Hola " + JSON.stringify(fields.template.components[0].parameters[0].text) + ". Este es tu codigo de acceso xxxxxx. No lo compartas.",
//                             "numero": JSON.stringify(fields.to),
//                             "respuesta": JSON.stringify(data),
//                             "horayfecha": JSON.stringify(new Date().toLocaleString())
//                         }
//                     }]
//                 };


//                 const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_ENVIO_CODIGOS, {

//                     method: 'POST',
//                     body: JSON.stringify(bodyAdmin),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 })

//                 return formattedReturn(200, EnviarAirtable3);


//             })


//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "Envio codigo por whatsapp de registro a:  " + JSON.stringify(fields.to),
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })



//             return formattedReturn(200, createdCourse);

//         }


//         // Envio SMS a usuarios del bot con ciclo

//         else if (tipo == "airtable") {


//             const courses = fields.courses;
//             for (let i = 0; i < courses.length; i++) {
//                 const objeto = courses[i];
//                 var numeroE = objeto.Id;
//                 numeroE = numeroE.toString();
//                 numeroE = numeroE.substring(2);

//                 var EnviarAirtable = await fetch("https://api.jsonbin.io/v3/b/", {

//                     method: 'POST',
//                     body: JSON.stringify({
//                         "country": "57",
//                         "message": objeto.nombre + text,
//                         "encoding": "GSM7",
//                         "messageFormat": 1,
//                         "addresseeList": [{
//                             "mobile": numeroE
//                         }]
//                     }),
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'X-Master-Key':'',
//                         'X-Collection-Id':''
//                         // 'Authorization': 'Basic ' + btoa(`${process.env.USERNAME_MSM}:${process.env.PASSWORD_MSM}`)
//                     }
//                 });
//                 var data = await EnviarAirtable.json();

//                 var body5 = {
//                     "records": [{
//                         "fields": {
//                             "mensaje": objeto.nombre + " " + JSON.stringify(text),
//                             "numeros": JSON.stringify(numeroE),
//                             "numerosenviados": JSON.stringify(data),
//                         }
//                     }]
//                 }

//                 var EnviarAirtable2 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJES, {

//                     method: 'POST',
//                     body: JSON.stringify(body5),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//             }

//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "Envio del mensaje: " + JSON.stringify(text) + ". A: " + courses.length + " usuarios ",
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })



//             return formattedReturn(200, EnviarAirtable2);

//         }

//         //Enviar notificaciín a SMS a administrador

//         else if (tipo == "Notificacion") {

//             const EnviarAirtable = await fetch("https://apitellit.aldeamo.com/SmsiWS/smsSendPost/", {

//                 method: 'POST',
//                 body: body2,
//                 headers: {
//                     'Content-Type': 'application/json',

//                     'Authorization': 'Basic ' + btoa(`jose.lacayo2:${process.env.PASSWORD_MSM}`)
//                 }
//             }).then(response => response.json()).then(async (data) => {

//                 const bodyAdmin = {
//                     "records": [{
//                         "fields": {
//                             "mensaje": JSON.stringify(fields.records.message),
//                             "canal": "MSM",
//                             "numero": JSON.stringify(fields.records.addresseeList[0].mobile),
//                             "respuesta": JSON.stringify(data),
//                             "fechaYHora": JSON.stringify(new Date().toLocaleString())
//                         }
//                     }]
//                 };


//                 const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_ADMIN, {

//                     method: 'POST',
//                     body: JSON.stringify(bodyAdmin),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 })

//                 return formattedReturn(200, EnviarAirtable3);


//             })



//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "Envio Notificacion por SMS al admin al numero " + JSON.stringify(fields.records.addresseeList[0].mobile),
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return formattedReturn(200, EnviarAirtable);


//         }



//         //registra ingreso de plataforma por Link

//         else if (tipo == "ingresoLink") {


//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "ingreso a plataforma por link",
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return formattedReturn(200, EnviarAirtable3);

//         }


//         //registra ingreso de plataforma por Login

//         else if (tipo == "ingreso") {



//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "ingreso a plataforma por login",
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return formattedReturn(200, EnviarAirtable3);

//         }

//         //registra Logout de plataforma 

//         else if (tipo == "logout") {


//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "logout",
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return formattedReturn(200, EnviarAirtable3);

//         }

//         //registra Navegacion entre la plataforma 

//         else if (tipo == "navRegistros") {

//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "Navegación entre dashboard:  " + fields.componente,
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return formattedReturn(200, EnviarAirtable3);

//         }


//         //envio codigo codificado a airtable

//         else if (tipo == "CodigoAirtable") {

//             const body = {
//                 "records": [{
//                     "fields": {
//                         "hash": fields.codigo,
//                         "id": JSON.stringify(fields.id)

//                     }
//                 }]
//             };

//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_ENVIO_CODIGO_LOGIN, {

//                 method: 'POST',
//                 body: JSON.stringify(body),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return formattedReturn(200, EnviarAirtable3);

//         }



//         //Enviar codigo a SMS a administrador

//         else if (tipo == "CodigoSMS") {
//             const numerosinIndicativo = fields.telefono
//             let numeroComoCadena = numerosinIndicativo.toString(); // convertir a cadena
//             let numeroSinDosPrimerosDigitos = numeroComoCadena.slice(2); // obtener subcadena sin los dos primeros dígitos
      
//             const body2 = {
//                 "country": "57",
//                 "message": "Hola . Este es tu codigo de acceso " + fields.codigo + ". No lo compartas.",
//                 "encoding": "GSM7",
//                 "messageFormat": 1,
//                 "addresseeList": [
//                     {
//                         "mobile": numeroSinDosPrimerosDigitos
//                     }
//                 ]
//             }


//             const EnviarAirtable = await fetch("https://apitellit.aldeamo.com/SmsiWS/smsSendPost/", {

//                 method: 'POST',
//                 body: JSON.stringify(body2),
//                 headers: {
//                     'Content-Type': 'application/json',

//                     'Authorization': 'Basic ' + btoa(`jose.lacayo2:${process.env.PASSWORD_MSM}`)
//                 }
//             }).then(response => response.json()).then(async (data) => {

//                 const bodyAdmin = {
//                     "records": [{
//                         "fields": {
//                             "mensaje": "Hola . Este es tu codigo de acceso xxxxxx. No lo compartas.",
//                             "numero": JSON.stringify(body2.addresseeList[0].mobile),
//                             "respuesta": JSON.stringify(data),
//                             "horayfecha": JSON.stringify(new Date().toLocaleString())
//                         }
//                     }]
//                 };


//                 const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_ENVIO_CODIGOS, {

//                     method: 'POST',
//                     body: JSON.stringify(bodyAdmin),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 })

//                 return formattedReturn(200, EnviarAirtable3);


//             })


//             const bodyIngreso = {
//                 "records": [{
//                     "fields": {
//                         "usuario": "user",
//                         "interaccion": "Envio codigo por SMS de registro a:  " + JSON.stringify(body2.addresseeList[0].mobile),
//                         "fechayhora": JSON.stringify(new Date()),
//                         "ip": dataip.ip

//                     }
//                 }]
//             };


//             const EnviarAirtable3 = await fetch(process.env.REACT_APP_URL_AIRTABLE_MENSAJE_REG, {

//                 method: 'POST',
//                 body: JSON.stringify(bodyIngreso),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return formattedReturn(200, EnviarAirtable);


//         }



//     } catch (err) {
//         console.error(err);
//         return formattedReturn(500, {});
//     }
// };
