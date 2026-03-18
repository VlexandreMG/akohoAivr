
const express=require("express");
const AkohoMatyController=require("../controllers/AkohoMatyController");

const router=express.Router();

router.get("/",AkohoMatyController.getAll);
router.get("/:id",AkohoMatyController.getById);
router.post("/",AkohoMatyController.create);
router.put("/:id",AkohoMatyController.update);
router.delete("/:id",AkohoMatyController.delete);

module.exports=router;
