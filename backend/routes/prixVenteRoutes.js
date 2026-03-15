const express = require('express');
const router = express.Router();

const PrixVenteService = require('../service/PrixVenteService');

router.post('/prix_vente', async (req, res) => { try { const created = await PrixVenteService.create(req.body); res.status(201).json(created); } catch (err) { res.status(500).send(err.message); } });
router.get('/prix_vente', async (req, res) => { try { res.json(await PrixVenteService.getAll()); } catch (err) { res.status(500).send(err.message); } });
router.get('/prix_vente/:id', async (req, res) => { try { const row = await PrixVenteService.getById(req.params.id); row ? res.json(row) : res.status(404).send('Prix vente non trouvé'); } catch (err) { res.status(500).send(err.message); } });
router.put('/prix_vente/:id', async (req, res) => { try { const updated = await PrixVenteService.update({ id: req.params.id, ...req.body }); updated ? res.json(updated) : res.status(404).send('Prix vente introuvable'); } catch (err) { res.status(500).send(err.message); } });
router.delete('/prix_vente/:id', async (req, res) => { try { await PrixVenteService.delete(req.params.id); res.status(204).send(); } catch (err) { res.status(500).send(err.message); } });

module.exports = router;