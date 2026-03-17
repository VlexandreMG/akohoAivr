const express = require('express');
const app = express(); // Utilise bien 'app' ici

// Import des routes
const lotRoutes = require('./routes/lotRoutes');
const raceRoutes = require('./routes/raceRoutes');
const equivalenceRoutes = require('./routes/equivalenceRoutes');
const akohoMatyRoutes = require('./routes/akohoMatyRoutes');
const atodyRoutes = require('./routes/atodyRoutes');
const etatAtodyRoutes = require('./routes/etatAtodyRoutes');
const prixVenteRoutes = require('./routes/prixVenteRoutes');
const prixAchatRoutes = require('./routes/prixAchatRoutes');
const bilanRoute = require('./routes/bilanRoutes');

app.use(express.json());

// Montage des routes sur le préfixe /api
app.use('/api', lotRoutes);
app.use('/api', raceRoutes);
app.use('/api', equivalenceRoutes);
app.use('/api', akohoMatyRoutes);
app.use('/api', atodyRoutes);
app.use('/api', etatAtodyRoutes);
app.use('/api', prixVenteRoutes);
app.use('/api', prixAchatRoutes);
app.use('/api', bilanRoute);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});