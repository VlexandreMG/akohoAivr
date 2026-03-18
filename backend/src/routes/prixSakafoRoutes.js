
const express=require("express");
const PrixSakafoController=require("../controllers/PrixSakafoController");

const router=express.Router();

router.get("/",PrixSakafoController.getAll);
router.get("/:id",PrixSakafoController.getById);
router.post("/",PrixSakafoController.create);
router.put("/:id",PrixSakafoController.update);
router.delete("/:id",PrixSakafoController.delete);

module.exports=router;
