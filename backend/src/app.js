
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const raceRoutes = require("./routes/raceRoutes");
const lotRoutes = require("./routes/lotRoutes");
const equivalenceRoutes = require("./routes/equivalenceRoutes");
const akohoMatyRoutes = require("./routes/akohoMatyRoutes");
const atodyRoutes = require("./routes/atodyRoutes");
const etatAtodyRoutes = require("./routes/etatAtodyRoutes");
const prixVenteRoutes = require("./routes/prixVenteRoutes");
const prixAchatRoutes = require("./routes/prixAchatRoutes");
const prixSakafoRoutes = require("./routes/prixSakafoRoutes");

app.use("/api/races", raceRoutes);
app.use("/api/lots", lotRoutes);
app.use("/api/equivalences", equivalenceRoutes);
app.use("/api/akohoMatys", akohoMatyRoutes);
app.use("/api/atodys", atodyRoutes);
app.use("/api/etatAtodys", etatAtodyRoutes);
app.use("/api/prixVentes", prixVenteRoutes);
app.use("/api/prixAchats", prixAchatRoutes);
app.use("/api/prixSakafos", prixSakafoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
