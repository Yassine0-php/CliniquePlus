
const sqlite3 = require('sqlite3').verbose();

let bddCliniquePlus = new sqlite3.Database('./CliniquePlus.db', sqlite3.OPEN_READWRITE);

function findPatientById(id, callback) {
    bddCliniquePlus.get(
        `SELECT * FROM patient WHERE id = ?`,
        [id],
        (err, row) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, row);
        }
    );
}

function ajouterNouveauPatient(nom, prenom, age, mail, telephone, callback) {
    bddCliniquePlus.run(
        `INSERT INTO patient (nom, prenom, age, mail, telephone) VALUES (?, ?, ?, ?, ?)`,
        [nom, prenom, age, mail, telephone],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.lastID);
        }
    );
}


function supprimerPatientId(id, callback) {
    bddCliniquePlus.run(
        `DELETE FROM patient WHERE id = ?`,
        [id],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}

function modifierPatient(id, nom, prenom, age, mail, telephone, callback) {

    bddCliniquePlus.run(
        `UPDATE patient 
         SET nom = ?, prenom = ?, age = ?, mail = ?, telephone = ?
         WHERE id = ?`,
        [nom, prenom, age, mail, telephone, id],
        function (err) {

            if (err) {
                return callback(err, null);
            }

            return callback(null, this.changes);
        }
    );
}








module.exports = {
    findPatientById,
    ajouterNouveauPatient,
    supprimerPatientId,
    modifierPatient
    
};