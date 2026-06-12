
const sqlite3 = require('sqlite3').verbose();

let bddCliniquePlus = new sqlite3.Database('./CliniquePlus.db', sqlite3.OPEN_READONLY);

function findPatientById(id, callback) {
    bddCliniquePlus.get(
        `SELECT * FROM patient WHERE patient.id = ?`,
        [id],
        (err, row) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, row);
        }
    );
}

module.exports = {
    findPatientById
};