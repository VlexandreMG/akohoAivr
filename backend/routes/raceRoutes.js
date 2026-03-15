const express = require('express');
const router = express.Router();

const RaceService = require('../service/RaceService');

router.post('/races', async (req, res) => {
	try {
		const created = await RaceService.createRace(req.body);
		res.status(201).json(created);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get('/races', async (req, res) => {
	try {
		const rows = await RaceService.getAllRaces();
		res.json(rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get('/races/:id', async (req, res) => {
	try {
		const row = await RaceService.getRaceById(req.params.id);
		row ? res.json(row) : res.status(404).send('Race non trouvée');
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.put('/races/:id', async (req, res) => {
	try {
		const updated = await RaceService.updateRace({ id: req.params.id, ...req.body });
		updated ? res.json(updated) : res.status(404).send('Race non trouvée');
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete('/races/:id', async (req, res) => {
	try {
		const result = await RaceService.deleteRace(req.params.id);
		res.status(204).send();
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;