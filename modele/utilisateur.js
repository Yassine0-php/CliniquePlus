
 

 const sqlite3 = require('sqlite3').verbose();

let bddCliniquePlus = new sqlite3.Database('./CliniquePlus.db', sqlite3.OPEN_READONLY);

function findUserByMailAndPassword(mail, password, callback) {
    bddCliniquePlus.get(
        `SELECT id, mail, password, role FROM users WHERE mail = ? AND password = ?`,
        [mail, password],
        (err, row) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, row);
        }
    );
}

module.exports = {
    findUserByMailAndPassword
};