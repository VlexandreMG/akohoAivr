
const express=require("express");
const PrixVenteController=require("../controllers/PrixVenteController");

const router=express.Router();

router.get("/",PrixVenteController.getAll);
router.get("/:id",PrixVenteController.getById);
router.post("/",PrixVenteController.create);
router.put("/:id",PrixVenteController.update);
router.delete("/:id",PrixVenteController.delete);

module.exports=router;
