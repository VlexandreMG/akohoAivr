const express = require('express');
const router = express.Router();

const etatAtodyController = require('../repositories/EtatAtodyRepository');

const EtatAtodyService = require('../service/EtatAtodyService');

router.post('/etat-atody', async (req, res) => { try { const created = await EtatAtodyService.create(req.body); res.status(201).json(created); } catch (err) { res.status(500).send(err.message); } });
router.get('/etat-atody', async (req, res) => { try { res.json(await EtatAtodyService.getAll()); } catch (err) { res.status(500).send(err.message); } });
router.get('/etat-atody/:id', async (req, res) => { try { const row = await EtatAtodyService.getById(req.params.id); row ? res.json(row) : res.status(404).send('Etat atody non trouvé'); } catch (err) { res.status(500).send(err.message); } });
router.put('/etat-atody/:id', async (req, res) => { try { const updated = await EtatAtodyService.update({ id: req.params.id, ...req.body }); updated ? res.json(updated) : res.status(404).send('Etat atody introuvable'); } catch (err) { res.status(500).send(err.message); } });
router.delete('/etat-atody/:id', async (req, res) => { try { await EtatAtodyService.delete(req.params.id); res.status(204).send(); } catch (err) { res.status(500).send(err.message); } });

module.exports = router;