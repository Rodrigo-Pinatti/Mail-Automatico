// Carga las variables de entorno desde un archivo .env al process.env
require('dotenv').config();

// Importa el módulo Router de express
const { Router } =require('express');

// Importa nodemailer para enviar correos electrónicos
const nodemailer=require('nodemailer');

// Crea una nueva instancia de un router de Express
const router = Router();

// Define la ruta para manejar solicitudes POST en /send-email
router.post('/send-email', async (req, res) => {
     // Extrae los datos del cuerpo de la solicitud
    const { name, email, telefono, fecha, turno } = req.body;


    // Configura el transporte de correo utilizando nodemailer
    const transporter = nodemailer.createTransport({
        // Dirección del servidor y puerto SMTP, obtenida de las variables de entorno
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,// Indica si se debe usar una conexión segura (false para conexiones no seguras)
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS

        }

    });

    try{
        // Envía el correo electrónico
        const info = await transporter.sendMail({
            from: "ConectarLAB",
            // Destinatario del correo, variable que se obtiene del formulario
            to: email,
            subject:"Reserva de turno",
            text:`${name}, gracias por realizar su reserva. Recuerde que el día ${fecha}, turno ${turno}, tiene su reserva.`, 
        });
        // Muestra un mensaje en consola indicando que el correo fue enviado exitosamente
        console.log('Correo enviado exitosamente', info.messageId);
         // Redirige al usuario a la página de éxito
        res.redirect('/success.html');
    }catch (error){
         // Muestra un mensaje de error en consola si ocurre un problema al enviar el correo
        console.error('Error al enviar el correo:', error);
        // Envía una respuesta de error al cliente
        res.status(500).send('Error al enviar el correo');
    }
});
// Exporta el router para que pueda ser utilizado en otros archivos
module.exports = router;
