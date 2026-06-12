const express = require("express");
const router = express.Router();
const patientModele = require('../modele/patient.js')

router.get('/', (req,res) => {

    const id  = Number(req.query.id);
    console.log("id reçu : ", id)
    patientModele.findPatientById(id, (err, patient) => {
        console.log(patient)
        if (err) {
            return res.status(500).json({ success: false });
         }

        if (patient) {
             return res.status(200).json({
                "patient": {
                    "id": patient.id,
                    "nom": patient.nom,
                    "prenom": patient.prenom,
                    "mail": patient.mail,
                    
                }
             });
        
        }else {
             return res.status(404).json({"message":"Patient non trouvé"})
        }

            
    });
});

module.exports = router;