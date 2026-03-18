
const EquivalenceService=require("../services/EquivalenceService");

class EquivalenceController{

static async getAll(req,res){
const data=await EquivalenceService.getAll();
res.json(data);
}

static async getById(req,res){
const data=await EquivalenceService.getById(req.params.id);
res.json(data);
}

static async create(req,res){
await EquivalenceService.create(req.body);
res.json({message:"created"});
}

static async update(req,res){
await EquivalenceService.update(req.params.id,req.body);
res.json({message:"updated"});
}

static async delete(req,res){
await EquivalenceService.delete(req.params.id);
res.json({message:"deleted"});
}

}

module.exports=EquivalenceController;
