
const RaceService=require("../services/RaceService");

class RaceController{

static async getAll(req,res){
const data=await RaceService.getAll();
res.json(data);
}

static async getById(req,res){
const data=await RaceService.getById(req.params.id);
res.json(data);
}

static async create(req,res){
await RaceService.create(req.body);
res.json({message:"created"});
}

static async update(req,res){
await RaceService.update(req.params.id,req.body);
res.json({message:"updated"});
}

static async delete(req,res){
await RaceService.delete(req.params.id);
res.json({message:"deleted"});
}

}

module.exports=RaceController;
