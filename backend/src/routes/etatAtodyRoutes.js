
const express = require("express");
const EtatAtodyController = require("../controllers/EtatAtodyController");


const router = express.Router();



// Nouvelle route POST utilisant le contrôleur RAW
router.post("/create-etat-atody", EtatAtodyController.createEtatAtody);
router.get("/rest/:id/:date", EtatAtodyController.getRest);

router.get("/", EtatAtodyController.getAll);
router.get("/:id", EtatAtodyController.getById);
router.post("/", EtatAtodyController.create);
router.put("/:id", EtatAtodyController.update);
router.delete("/:id", EtatAtodyController.delete);


module.exports = router;


