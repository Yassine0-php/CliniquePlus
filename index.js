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

// On connecte la base de données
let bddCliniquePlus = new sqlite3.Database('./CliniquePlus.db', sqlite3.OPEN_READONLY, (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log('Connecté à la base de données.');
    }
});


// Déclaration de la route et du traitement des données POST





app.use(router);

// On initialise le serveur et son port d'écoute
app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});