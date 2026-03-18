

const express=require("express");
const LotController=require("../controllers/LotController");

const router=express.Router();


router.get("/etat-atody-by-lot", LotController.getEtatAtodyByLotId);
router.get("/rest-capacite-atody", LotController.getRestCaapaciteAtody);
router.get("/sakafo-lany", LotController.getSakafoLany);
router.get("/poids-actuel", LotController.getPoidsActuel);
router.get("/rest-sexe", LotController.getRestSexe);
router.get("/date-by-semaine-jour", LotController.getDateByNumeroSemaineEtJourAvecInitial);
router.get("/situation-globale", LotController.getSituationGlobale);
router.get("/", LotController.getAll);
router.get("/:id", LotController.getById);
router.post("/", LotController.create);
router.put("/:id", LotController.update);
router.delete("/:id", LotController.delete);

module.exports=router;
