const express = require('express');
const router = express.Router();

const AkohoMatyService = require('../service/AkohoMatyService');

router.post('/akoho_maty', async (req, res) => { try { const created = await AkohoMatyService.create(req.body); res.status(201).json(created); } catch (err) { res.status(500).send(err.message); } });
router.get('/akoho_maty', async (req, res) => { try { res.json(await AkohoMatyService.getAll()); } catch (err) { res.status(500).send(err.message); } });
router.get('/akoho_maty/:id', async (req, res) => { try { const row = await AkohoMatyService.getById(req.params.id); row ? res.json(row) : res.status(404).send('Enregistrement non trouvé'); } catch (err) { res.status(500).send(err.message); } });
router.put('/akoho_maty/:id', async (req, res) => { try { const updated = await AkohoMatyService.update({ id: req.params.id, ...req.body }); updated ? res.json(updated) : res.status(404).send('Enregistrement introuvable'); } catch (err) { res.status(500).send(err.message); } });
router.delete('/akoho_maty/:id', async (req, res) => { try { await AkohoMatyService.delete(req.params.id); res.status(204).send(); } catch (err) { res.status(500).send(err.message); } });


module.exports = router;