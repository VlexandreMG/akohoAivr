
const AtodyService=require("../services/AtodyService");

class AtodyController{

static async getRestCapaciteAtody(req, res) {
	const { lotId, date } = req.params;
	try {
		const rest = await AtodyService.getRestCapaciteAtody(lotId, date);
		res.json({ lotId, date, rest });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

static async getAll(req,res){
const data=await AtodyService.getAll();
res.json(data);
}

static async getById(req,res){
const data=await AtodyService.getById(req.params.id);
res.json(data);
}

static async create(req,res){
await AtodyService.create(req.body);
res.json({message:"created"});
}

static async update(req,res){
await AtodyService.update(req.params.id,req.body);
res.json({message:"updated"});
}

static async delete(req,res){
await AtodyService.delete(req.params.id);
res.json({message:"deleted"});
}

}

module.exports=AtodyController;
