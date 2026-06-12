const express = require("express");
const router = express.Router();

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

module.exports = router;