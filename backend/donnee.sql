USE akoho_lol;
GO

-- ============================================================
-- 1. RACE : Borbonèze
-- ============================================================
-- D'après la capture :
--   Prix d'achat        : 500 Ar/poulet
--   Prix de vente       : 15 Ar/g
--   Nb jour foy         : 30  → temps_pondaison = 30
--   Prix atody          : 500 Ar/unité
--   % femelle           : non précisé → 50% par défaut
--   capacite_pondaison  : colonne "Nb jour foy" = 30
--   pourcentage_morte_* : non précisé → 5% par défaut
-- ============================================================
INSERT INTO race (
    nom,
    description,
    temps_pondaison,
    pourcentage_femelle,
    pourcentage_morte_femelle,
    capacite_pondaison,
    pourcentage_morte_atody
)
VALUES (
    'Borbonèze',
    'Race de test',
    30,       -- Nb jour foy
    50.00,    -- 50% femelle
    5.00,     -- 5% mortalité femelle (hypothèse)
    30,       -- capacité pondaison = nb jour foy
    5.00      -- 5% mortalité atody (hypothèse)
);
GO

-- ============================================================
-- 2. EQUIVALENCE : table poids/sakafo par semaine pour Borbonèze
--    D'après la capture colonnes B (Semaine), C (Cap augm poids), D (Sakafo necessaire)
--    id_race = 1 (Borbonèze insérée ci-dessus)
-- ============================================================
INSERT INTO equivalence (numero_semaine, id_race, poids, sakafo) VALUES
(0,  1,  50,  0),
(1,  1,  20,  75),
(2,  1,  25,  80),
(3,  1,  30,  100),
(4,  1,  40,  150),
(5,  1,  80,  170),
(6,  1,  85,  190),
(7,  1, 100,  200),
(8,  1, 100,  250),
(9,  1,  90,  270),
(10, 1, 140,  290),
(11, 1, 200,  300),
(12, 1, 220,  370),
(13, 1, 265,  390),
(14, 1, 285,  350),
(15, 1, 300,  300),
(16, 1, 350,  450),
(17, 1, 400,  500),
(18, 1, 420,  400),
(19, 1, 430,  500),
(20, 1, 500,  500),
(21, 1, 530,  650),
(22, 1, 600,  600),
(23, 1, 400,  750),
(24, 1, 100,  750),
(25, 1,   0,  600);
GO

-- ============================================================
-- 3. PRIX VENTE : Borbonèze
--    prix_akoho_g = 15 Ar/g  |  prix_atody_unitaire = 500 Ar
-- ============================================================
INSERT INTO prix_vente (id_race, prix_akoho_g, prix_atody_unitaire)
VALUES (1, 15.00, 500.00);
GO

-- ============================================================
-- 4. PRIX ACHAT : Borbonèze
--    prix_akoho_unitaire = 500 Ar/poulet  |  semaine_initial = 0
-- ============================================================
INSERT INTO prix_achat (id_race, semaine_initial, prix_akoho_unitaire, prix_atody_unitaire)
VALUES (1, 0, 500.00, 500.00);
GO

-- ============================================================
-- 5. LOT 1
--    Créé le 01/01/2026, 200 poulets, race Borbonèze
--    prix_achat = 500 * 200 = 100 000 Ar (total)
--    origine = 'akoho', semaine_initial = 0
-- ============================================================
INSERT INTO lot (nom, id_race, nombre, daty, origine, semaine_initial, prix_achat)
VALUES ('Lot 1', 1, 200, '2026-01-01', 'akoho', 0, 100000.00);
GO

-- ============================================================
-- 6. AKOHO MATY : 15 morts le 01/02/2026
--    id_lot = 1
-- ============================================================
INSERT INTO akohoMaty (id_lot, nombre, date, cause)
VALUES (1, 15, '2026-02-01', NULL);
GO

-- ============================================================
-- 7. ATODY (œufs pondus)
--    100 œufs le 02/02/2026
--    150 œufs le 15/02/2026
-- ============================================================
INSERT INTO atody (id_lot, nombre, date)
VALUES (1, 100, '2026-02-02');

INSERT INTO atody (id_lot, nombre, date)
VALUES (1, 150, '2026-02-15');
GO

-- ============================================================
-- 8. ETAT ATODY (état des œufs : fohy = cassés, simba = sains)
--    Exemple : 10 fohy + 90 simba le 02/02, 20 fohy + 130 simba le 15/02
-- ============================================================
INSERT INTO etatAtody (id_lot, type, nombre, date)
VALUES (1, 'fohy',  10, '2026-02-02');

INSERT INTO etatAtody (id_lot, type, nombre, date)
VALUES (1, 'simba', 90, '2026-02-02');

INSERT INTO etatAtody (id_lot, type, nombre, date)
VALUES (1, 'fohy',  20, '2026-02-15');

INSERT INTO etatAtody (id_lot, type, nombre, date)
VALUES (1, 'simba', 130, '2026-02-15');
GO

-- ============================================================
-- VERIFICATION
-- ============================================================
SELECT 'race'       AS [table], COUNT(*) AS nb FROM race
UNION ALL
SELECT 'equivalence',           COUNT(*) FROM equivalence
UNION ALL
SELECT 'prix_vente',            COUNT(*) FROM prix_vente
UNION ALL
SELECT 'prix_achat',            COUNT(*) FROM prix_achat
UNION ALL
SELECT 'lot',                   COUNT(*) FROM lot
UNION ALL
SELECT 'akohoMaty',             COUNT(*) FROM akohoMaty
UNION ALL
SELECT 'atody',                 COUNT(*) FROM atody
UNION ALL
SELECT 'etatAtody',             COUNT(*) FROM etatAtody
UNION ALL
SELECT 'prix_sakafo',           COUNT(*) FROM prix_sakafo;
GO