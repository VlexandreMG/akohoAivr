
const PrixAchatService=require("../services/PrixAchatService");

class PrixAchatController{

static async getAll(req,res){
const data=await PrixAchatService.getAll();
res.json(data);
}

static async getById(req,res){
const data=await PrixAchatService.getById(req.params.id);
res.json(data);
}

static async create(req,res){
await PrixAchatService.create(req.body);
res.json({message:"created"});
}

static async update(req,res){
await PrixAchatService.update(req.params.id,req.body);
res.json({message:"updated"});
}

static async delete(req,res){
await PrixAchatService.delete(req.params.id);
res.json({message:"deleted"});
}

}

module.exports=PrixAchatController;
