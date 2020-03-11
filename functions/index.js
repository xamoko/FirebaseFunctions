const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const transport = nodemailer.createTransport({
     service: "Gmail",
     auth:{
         user: "servicenetworkco@gmail.com",
         pass: "L1nux2019"
     }
})

exports.welcomeMail1 = functions
.firestore
.document("bienvenida/{id}")
.onCreate((snap, context) => {
    const email = snap.data().email;
    const name = snap.data().name;
    console.log(aqui+" "+email+" "+name);
    return sendWelcomeMail(email, name);
});

function sendWelcomeMail(email, name){
    return transport.sendMail({
        from: "Prueba Firebase<servicenetworkco@gmail.com>",
        to: email,
        subject: "hola",
        html: `
            <h1>hola ${name}</h1>
            <p>Prueba realizada</p>`

    })
    .then(r => r)
    .catch(e => e);
}