
const PrixVenteService=require("../services/PrixVenteService");

class PrixVenteController{

static async getAll(req,res){
const data=await PrixVenteService.getAll();
res.json(data);
}

static async getById(req,res){
const data=await PrixVenteService.getById(req.params.id);
res.json(data);
}

static async create(req,res){
await PrixVenteService.create(req.body);
res.json({message:"created"});
}

static async update(req,res){
await PrixVenteService.update(req.params.id,req.body);
res.json({message:"updated"});
}

static async delete(req,res){
await PrixVenteService.delete(req.params.id);
res.json({message:"deleted"});
}

}

module.exports=PrixVenteController;
