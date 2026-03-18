
const express=require("express");
const RaceController=require("../controllers/RaceController");

const router=express.Router();

router.get("/",RaceController.getAll);
router.get("/:id",RaceController.getById);
router.post("/",RaceController.create);
router.put("/:id",RaceController.update);
router.delete("/:id",RaceController.delete);

module.exports=router;
