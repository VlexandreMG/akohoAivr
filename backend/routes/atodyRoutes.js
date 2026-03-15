const express = require('express');
const router = express.Router();

const AtodyService = require('../service/AtodyService');

router.post('/atody', async (req, res) => { try { const created = await AtodyService.create(req.body); res.status(201).json(created); } catch (err) { res.status(500).send(err.message); } });
router.get('/atody', async (req, res) => { try { res.json(await AtodyService.getAll()); } catch (err) { res.status(500).send(err.message); } });
router.get('/atody/:id', async (req, res) => { try { const row = await AtodyService.getById(req.params.id); row ? res.json(row) : res.status(404).send('Atody non trouvé'); } catch (err) { res.status(500).send(err.message); } });
router.put('/atody/:id', async (req, res) => { try { const updated = await AtodyService.update({ id: req.params.id, ...req.body }); updated ? res.json(updated) : res.status(404).send('Atody introuvable'); } catch (err) { res.status(500).send(err.message); } });
router.delete('/atody/:id', async (req, res) => { try { await AtodyService.delete(req.params.id); res.status(204).send(); } catch (err) { res.status(500).send(err.message); } });

module.exports = router;