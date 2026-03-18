
const AkohoMatyService=require("../services/AkohoMatyService");

class AkohoMatyController{

static async getAll(req,res){
const data=await AkohoMatyService.getAll();
res.json(data);
}

static async getById(req,res){
const data=await AkohoMatyService.getById(req.params.id);
res.json(data);
}

static async create(req,res){
await AkohoMatyService.create(req.body);
res.json({message:"created"});
}

static async update(req,res){
await AkohoMatyService.update(req.params.id,req.body);
res.json({message:"updated"});
}

static async delete(req,res){
await AkohoMatyService.delete(req.params.id);
res.json({message:"deleted"});
}

}

module.exports=AkohoMatyController;
