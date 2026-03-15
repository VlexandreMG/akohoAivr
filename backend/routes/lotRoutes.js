const express = require('express');
const router = express.Router();

const LotService = require('../service/LotService');

router.post('/lots', async (req, res) => {
	try {
		const created = await LotService.create(req.body);
		res.status(201).json(created);
	} catch (err) { res.status(500).send(err.message); }
});

router.get('/lots', async (req, res) => {
	try { res.json(await LotService.getAll()); } catch (err) { res.status(500).send(err.message); }
});

router.get('/lots/:id/reste-vivants/:date', async (req, res) => {
	try {
		// this logic belongs in service; fallback to getById for now
		const { id } = req.params;
		const row = await LotService.getById(id);
		row ? res.json(row) : res.status(404).send('Lot non trouvé');
	} catch (err) { res.status(500).send(err.message); }
});

router.get('/lots/:id', async (req, res) => {
	try { const row = await LotService.getById(req.params.id); row ? res.json(row) : res.status(404).send('Lot introuvable'); } catch (err) { res.status(500).send(err.message); }
});

router.get('/lots/race/:id', async (req, res) => {
	try { res.json(await LotService.getByRaceId(req.params.id)); } catch (err) { res.status(500).send(err.message); }
});

router.put('/lots/:id', async (req, res) => {
	try { const updated = await LotService.update({ id: req.params.id, ...req.body }); updated ? res.json(updated) : res.status(404).send('Lot introuvable'); } catch (err) { res.status(500).send(err.message); }
});

router.delete('/lots/:id', async (req, res) => {
	try { await LotService.delete(req.params.id); res.status(204).send(); } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;