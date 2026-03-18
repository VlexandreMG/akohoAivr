

const sql = require("mssql");

let pool = null;

const config = {
    user: "akoho",
    password: "@koho?2026",
    server: "127.0.0.1",
    database: "akoho",
    options: { trustServerCertificate: true }
};

async function getConnection() {
    pool = await sql.connect(config);
    return pool;
}
async function getPool() {
    if (!pool) {
        pool = await getConnection();
    }
    return pool;
}

async function closeConnection() {
    try {
        if (pool) {
            await pool.close();
            pool = null;
            console.log("Connexion fermée");
        }
    } catch (err) {
        console.error("Erreur lors de la fermeture:", err);
    }
}

// Fonction utilitaire pour exécuter des requêtes
async function executeQuery(query, params = {}) {
    try {
        const pool = await getPool();
        const request = pool.request();
        
        // Ajouter les paramètres si nécessaire
        Object.keys(params).forEach(key => {
            request.input(key, params[key]);
        });
        
        const result = await request.query(query);
        return result;
    } catch (err) {
        console.error("Erreur lors de l'exécution de la requête:", err);
        throw err;
    }
}


module.exports = {
    getConnection,
    closeConnection,
    executeQuery
};
