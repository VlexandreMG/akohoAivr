
const express=require("express");
const PrixAchatController=require("../controllers/PrixAchatController");

const router=express.Router();

router.get("/",PrixAchatController.getAll);
router.get("/:id",PrixAchatController.getById);
router.post("/",PrixAchatController.create);
router.put("/:id",PrixAchatController.update);
router.delete("/:id",PrixAchatController.delete);

module.exports=router;
