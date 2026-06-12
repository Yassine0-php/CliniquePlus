
const sqlite3 = require('sqlite3').verbose();

let bddCliniquePlus = new sqlite3.Database('./CliniquePlus.db', sqlite3.OPEN_READONLY);

function findAllPatients(callback) {
    bddCliniquePlus.all(
        `SELECT * FROM patients`,(err,row) => {
            if (err) {
                return callback(err,null);
            }
            return callback(null, row);
        }
    );
}

function findPatientById(id, callback) {
    bddCliniquePlus.get(
        `SELECT * FROM patients WHERE patients.idPatient = ?`,
        [id],
        (err, row) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, row);
        }
    );
}

function findPatientsByService(service, callback) {

    console.log(service);
    bddCliniquePlus.all(
        `SELECT * FROM patients WHERE patients.servicePatient = ?`,
        [service],
        (err, rows) => {
            console.log(2, err)
            if (err) {
                return callback(err, null);
            }
            console.log(3, rows)
            return callback(null, rows);
        }
    );
}

module.exports = {
    findAllPatients,
    findPatientById,
    findPatientsByService
};