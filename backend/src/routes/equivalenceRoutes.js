
const express=require("express");
const EquivalenceController=require("../controllers/EquivalenceController");

const router=express.Router();

router.get("/",EquivalenceController.getAll);
router.get("/:id",EquivalenceController.getById);
router.post("/",EquivalenceController.create);
router.put("/:id",EquivalenceController.update);
router.delete("/:id",EquivalenceController.delete);

module.exports=router;
