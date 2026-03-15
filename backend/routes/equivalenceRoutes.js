const express = require('express');
const router = express.Router();

const EquivalenceService = require('../service/EquivalenceService');

router.post('/equivalences', async (req, res) => {
	try { const created = await EquivalenceService.create(req.body); res.status(201).json(created); } catch (err) { res.status(500).send(err.message); }
});

router.get('/equivalences', async (req, res) => {
	try { res.json(await EquivalenceService.getAll()); } catch (err) { res.status(500).send(err.message); }
});

router.get('/equivalences/:id', async (req, res) => {
	try { const row = await EquivalenceService.getById(req.params.id); row ? res.json(row) : res.status(404).send('Equivalence non trouvée'); } catch (err) { res.status(500).send(err.message); }
});

router.put('/equivalences/:id', async (req, res) => {
	try { const updated = await EquivalenceService.update({ id: req.params.id, ...req.body }); updated ? res.json(updated) : res.status(404).send('Equivalence introuvable'); } catch (err) { res.status(500).send(err.message); }
});

router.delete('/equivalences/:id', async (req, res) => {
	try { await EquivalenceService.delete(req.params.id); res.status(204).send(); } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;