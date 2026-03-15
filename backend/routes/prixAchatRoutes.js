const express = require('express');
const router = express.Router();

const PrixAchatService = require('../service/PrixAchatService');

router.post('/prix_achat', async (req, res) => { try { const created = await PrixAchatService.create(req.body); res.status(201).json(created); } catch (err) { res.status(500).send(err.message); } });
router.get('/prix_achat', async (req, res) => { try { res.json(await PrixAchatService.getAll()); } catch (err) { res.status(500).send(err.message); } });
router.get('/prix_achat/:id', async (req, res) => { try { const row = await PrixAchatService.getById(req.params.id); row ? res.json(row) : res.status(404).send('Prix achat non trouvé'); } catch (err) { res.status(500).send(err.message); } });
router.put('/prix_achat/:id', async (req, res) => { try { const updated = await PrixAchatService.update({ id: req.params.id, ...req.body }); updated ? res.json(updated) : res.status(404).send('Prix achat introuvable'); } catch (err) { res.status(500).send(err.message); } });
router.delete('/prix_achat/:id', async (req, res) => { try { await PrixAchatService.delete(req.params.id); res.status(204).send(); } catch (err) { res.status(500).send(err.message); } });

module.exports = router;