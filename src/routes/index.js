//se importan las librerias
require('dotenv').config();
const { Router } =require('express');
const nodemailer=require('nodemailer');
const router = Router();


router.post('/send-email', async (req, res) => {
    const { name, email, telefono, fecha, turno } = req.body;



    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        //service:'gmail',
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS

        }

    });

    try{
        const info = await transporter.sendMail({
            from: "ConectarLAB",
            to: email,
            subject:"Reserva de turno",
            text:`${name}, gracias por realizar su reserva. Recuerde que el día ${fecha}, turno ${turno}, tiene su reserva.`, 
        });

        console.log('Correo enviado exitosamente', info.messageId);

        res.redirect('/success.html');
    }catch (error){
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
    }
});

module.exports = router;
