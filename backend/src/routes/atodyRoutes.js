
const express=require("express");
const AtodyController=require("../controllers/AtodyController");

const router=express.Router();


// Nouvelle route pour la capacité restante
router.get("/rest-capacite/:lotId/:date", AtodyController.getRestCapaciteAtody);

router.get("/",AtodyController.getAll);
router.get("/:id",AtodyController.getById);
router.post("/",AtodyController.create);
router.put("/:id",AtodyController.update);
router.delete("/:id",AtodyController.delete);

module.exports=router;
