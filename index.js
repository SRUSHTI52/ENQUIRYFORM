const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(cors({
    origin: '*'  // Replace with your frontend origin
   }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/enquiry', (req, res) => {
  console.log('req : ',req);
  const { name, phone, email, property, checkin, checkout } = req.body;

  // Set up Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other email services as well
    auth: {
      user: process.env.APP_MAIL,         // Replace with your email address
      pass: process.env.APP_PASSWORD              // Replace with your email password or app-specific password
    }
  });

  const mailOptions = {
    from: process.env.APP_MAIL,           // Replace with your email address
    to: process.env.APP_MAIL,             // Replace with the recipient's email address
    subject: 'Enquiry',
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Property:</strong> ${property}</p>
      <p><strong>Check-in Date:</strong> ${checkin}</p>
      <p><strong>Check-out Date:</strong> ${checkout}</p>
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send(`Error sending email: ${error}`);
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send('Email sent successfully');
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const serviceAccount = require('./firebase-adminsdk.json');  // Replace with the path to your Firebase service account key

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// const app = express();
// app.use(cors());
// // app.use(cors({
// //     origin: 'http://localhost1:3000'  // Replace with your frontend origin
// //   }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/enquiry', (req, res) => {
//   const { name, phone, email, property, checkin, checkout } = req.body;

// //   // Save to Firestore
// //   await db.collection('enquiries').add({
// //     name,
// //     phone,
// //     email,
// //     property,
// //     checkin,
// //     checkout,
// //     timestamp: admin.firestore.FieldValue.serverTimestamp()
// //   })
// //   .then(() => {
//     // Set up Nodemailer
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',  // You can use other email services as well
//       auth: {
//         user: 'jssp121528@gmail.com',         // Replace with your company's email
//         pass: 'android@studio02'              // Replace with your company's email password
//       }
//     });

//     const mailOptions = {
//       from: 'jssp121528@gmail.com',           // Replace with your company's email
//       to: 'jssp121528@gmail.com',             // Replace with the company's email address to receive enquiries
//       subject: 'New Property Enquiry',
//       html: `
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Property:</strong> ${property}</p>
//         <p><strong>Check-in Date:</strong> ${checkin}</p>
//         <p><strong>Check-out Date:</strong> ${checkout}</p>
//       `
//     };

//     // Send email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).send('Error sending email${error}');
//       } else {
//         console.log('Email sent: ' + info.response);
//         return res.status(200).send('Success');
//       }
//     });
// //   })
// //   .catch(error => {
// //     console.error("Error adding document: ", error);
// //     return res.status(500).send('Error saving to database');
// //   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
