// db.js
const sql = require('mssql');

const config = {
    server: '127.0.0.1',
    database: 'akoho',
    user: 'akoho',           // Login SQL
    password: '@koho?2026',   // Mot de passe
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

let pool = null;

async function connectToDatabase() {
    try {
        if (pool) {
            console.log("Connexion déjà existante");
            return pool;
        }
        
        pool = await sql.connect(config);
        console.log("Connecté à SQL Server");
        return pool;
    } catch (err) {
        console.log("Erreur connexion:", err);
        throw err;
    }
}

async function getPool() {
    if (!pool) {
        await connectToDatabase();
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
    connectToDatabase,
    getPool,
    closeConnection,
    executeQuery,
    sql
};