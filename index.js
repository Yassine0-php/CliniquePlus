const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const app = express();


const router = express.Router();

// On conditionne le framework pour l'usage du json
app.use(express.json());
// On déclare une variable qui contient le port
const port = 3000;

const userRoute = require('./routes/utilisateurs.js')
const patientRoute = require('./routes/patient.js')

app.use('/login', userRoute)
app.use('/patientId', patientRoute)
app.use('/patients',patientRoute)

// On connecte la base de données
let bddCliniquePlus = new sqlite3.Database('./CliniquePlus.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log('Connecté à la base de données.');
    }
});


// ajouter un patient

// app.post("/patients", (req, res) => {
//     const { nom, prenom, age, mail, telephone } = req.body;

//     const sql = "INSERT INTO patient (nom, prenom, age, mail, telephone) VALUES (?, ?, ?,?,?)";

//     bddCliniquePlus.run(sql, [nom, prenom, age, mail, telephone], function (err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         res.status(201).json({
//             message: "Patient ajouté avec succès",
//             id: this.lastID
//         });
//     });
// });







// On initialise le serveur et son port d'écoute
app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});