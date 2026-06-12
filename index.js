const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const app = express();
const userModele = require('./Modele/utilisateur.js');
const patientModele = require('./Modele/patient.js')
const router = express.Router();

// On conditionne le framework pour l'usage du json
app.use(express.json());
// On déclare une variable qui contient le port
const port = 3000;




// On connecte la base de données
/* let bddCliniquePlus = new sqlite3.Database('./CliniquePlus.db', sqlite3.OPEN_READONLY, (err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log('Connecté à la base de données.');
    }
});
 */

// Déclaration de la route et du traitement des données POST

router.post('/login', (req, res) => {

    const { mail, password } = req.body;

    userModele.findUserByMailAndPassword(mail, password, (err, user) => {

        if (err) {
            return res.status(500).json({ success: false });
        }

        if (user) {
            return res.status(200).json({
                success: true,
                message: "Connexion validée",
                id: user.id,
                role: user.role
            });
        }

        return res.status(401).json({
            success: false,
            message: "Connexion refusée"
        });
    });
});

router.get('/patients', (req,res) => {
    patientModele.findAllPatients((err,patients) => {
        if (err) {
            return res.status(500).json({ success: false });
        }

        if (patients) {
            console.log(patients);
            return res.status(200).json(patients);
            }
            
        });
    });

router.get('/patientId/:id', (req,res) => {
    const { id } = req.params;
    patientModele.findPatientById(id, (err, patient) => {
        if (err) {
            return res.status(500).json({ success: false });
        }

        if (patient) {
            return res.status(200).json(patient);
        
        } else {
             return res.status(404).json({"message":"Patient non trouvé"});
        }

            
    });
});

router.get('/patientsService/:service', (req,res) => {
    
    const { service } = req.params;
    patientModele.findPatientsByService(service, (err,patients) => {
        if (err) {
            return res.status(500).json({ success: false });
        }

        console.log(service, err,patients)

        if (patients) {
            console.log(patients);
            for (let patient of patients) {
                console.log(patient);
            }
            return res.status(200).json({
                    "patient": {
                        "id": patient.idPatient,
                        "nom": patient.nomPatient,
                        "prenom": patient.prenomPatient,
                        "mail": patient.mail,
                        "nir": patient.nirPatient                    
                    }
                });
        } else {
             return res.status(404).json({"message":"Patient non trouvé"});
        } 
    });
});

app.use(router);

// On initialise le serveur et son port d'écoute
app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});