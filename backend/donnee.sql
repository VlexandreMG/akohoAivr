
-- ============================================
-- 1. Insertion dans la table race
-- ============================================
INSERT INTO race (nom, description) VALUES
    ('Poulet de Bresse', 'Race française réputée pour sa qualité de viande'),
    ('Cochin', 'Race asiatique au plumage abondant, bonne chair'),
    ('Leghorn', 'Race italienne, excellente pondeuse'),
    ('Sussex', 'Race anglaise polyvalente viande/œufs'),
    ('Orpington', 'Race anglaise massive et docile'),
    ('Brahma', 'Grande race asiatique, viande abondante'),
    ('Wyandotte', 'Race américaine, bonne pondeuse'),
    ('Marans', 'Race française, œufs roux foncé'),
    ('Australorp', 'Race australienne, excellente pondeuse'),
    ('Faverolles', 'Race française, chair tendre');
GO

-- ============================================
-- 2. Insertion dans la table lot
-- ============================================
INSERT INTO lot (nom, id_race, nombre, daty, origine) VALUES
('lot1', 1, 100, '2024-01-10', 'akoho'),
('lot2', 1, 150, '2024-01-15', 'akoho'),
('lot3', 2, 80, '2024-01-12', 'akoho'),
('lot4', 2, 120, '2024-01-20', 'akoho'),
('lot5', 3, 200, '2024-01-05', 'akoho'),
('lot6', 3, 250, '2024-01-18', 'akoho'),
('lot7', 4, 90, '2024-01-08', 'akoho'),
('lot8', 4, 110, '2024-01-22', 'akoho'),
('lot9', 5, 60, '2024-01-14', 'akoho'),
('lot10', 5, 70, '2024-01-25', 'akoho'),
('lot11', 6, 50, '2024-01-16', 'akoho'),
('lot12', 7, 130, '2024-01-19', 'akoho'),
('lot13', 8, 85, '2024-01-21', 'akoho'),
('lot14', 9, 140, '2024-01-23', 'akoho'),
('lot15', 10, 75, '2024-01-24', 'akoho');
GO
-- ============================================
-- 3. Insertion dans la table equivalence
-- ============================================
INSERT INTO equivalence (numero_semaine, id_race, poids, sakafo) VALUES
    -- Poulet de Bresse (id=1)
    (1, 1, 0.20, 0.15), (2, 1, 0.40, 0.20), (3, 1, 0.65, 0.25),
    (4, 1, 0.90, 0.30), (5, 1, 1.20, 0.35), (6, 1, 1.50, 0.40),
    (7, 1, 1.80, 0.45), (8, 1, 2.10, 0.50), (9, 1, 2.40, 0.55),
    (10, 1, 2.70, 0.60),
    
    -- Cochin (id=2)
    (1, 2, 0.18, 0.12), (2, 2, 0.38, 0.18), (3, 2, 0.62, 0.24),
    (4, 2, 0.88, 0.30), (5, 2, 1.15, 0.36), (6, 2, 1.45, 0.42),
    (7, 2, 1.75, 0.48), (8, 2, 2.05, 0.54), (9, 2, 2.35, 0.60),
    (10, 2, 2.65, 0.66),
    
    -- Leghorn (id=3)
    (1, 3, 0.15, 0.10), (2, 3, 0.32, 0.16), (3, 3, 0.52, 0.22),
    (4, 3, 0.75, 0.28), (5, 3, 0.98, 0.34), (6, 3, 1.22, 0.40),
    (7, 3, 1.46, 0.46), (8, 3, 1.70, 0.52), (9, 3, 1.94, 0.58),
    (10, 3, 2.18, 0.64);
GO

-- ============================================
-- 4. Insertion dans la table akohoMaty
-- ============================================
INSERT INTO akohoMaty (id_lot, nombre, date, cause) VALUES
    (1, 5, '2024-01-20', 'Maladie respiratoire'),
    (1, 3, '2024-02-01', 'Blessure'),
    (2, 4, '2024-01-28', 'Stress thermique'),
    (3, 2, '2024-01-25', 'Prédateur'),
    (3, 3, '2024-02-05', 'Maladie'),
    (4, 6, '2024-02-10', 'Infection'),
    (5, 4, '2024-01-22', 'Canibalisme'),
    (5, 2, '2024-02-15', 'Accident'),
    (6, 5, '2024-02-01', 'Maladie digestive'),
    (7, 3, '2024-02-08', 'Cause inconnue'),
    (8, 2, '2024-01-30', 'Prédateur'),
    (9, 4, '2024-02-12', 'Maladie'),
    (10, 3, '2024-02-18', 'Stress');
GO

-- ============================================
-- 5. Insertion dans la table atody
-- ============================================
INSERT INTO atody (id_lot, nombre, date) VALUES
    (1, 45, '2024-02-01'), (1, 48, '2024-02-02'), (1, 52, '2024-02-03'),
    (2, 60, '2024-02-01'), (2, 65, '2024-02-02'), (2, 62, '2024-02-03'),
    (3, 120, '2024-02-01'), (3, 125, '2024-02-02'), (3, 130, '2024-02-03'),
    (4, 40, '2024-02-01'), (4, 42, '2024-02-02'), (4, 38, '2024-02-03'),
    (5, 85, '2024-02-01'), (5, 88, '2024-02-02'), (5, 82, '2024-02-03'),
    (6, 95, '2024-02-01'), (6, 98, '2024-02-02'), (6, 92, '2024-02-03'),
    (7, 55, '2024-02-01'), (7, 58, '2024-02-02'), (7, 60, '2024-02-03'),
    (8, 70, '2024-02-01'), (8, 72, '2024-02-02'), (8, 68, '2024-02-03'),
    (9, 30, '2024-02-01'), (9, 32, '2024-02-02'), (9, 28, '2024-02-03'),
    (10, 35, '2024-02-01'), (10, 38, '2024-02-02'), (10, 40, '2024-02-03');
GO

-- ============================================
-- 6. Insertion dans la table etatAtody
-- ============================================
INSERT INTO etatAtody (id_lot, type, nombre, date) VALUES
    -- atody id 1-3 (lot 1)
    (1, 'fohy', 40, '2024-02-01'),
    (1, 'simba', 5, '2024-02-01'),
    (2, 'fohy', 45, '2024-02-02'),
    (2, 'simba', 3, '2024-02-02'),
    (3, 'fohy', 48, '2024-02-03'),
    (3, 'simba', 4, '2024-02-03'),
    
    -- atody id 4-6 (lot 2)
    (4, 'fohy', 55, '2024-02-01'),
    (4, 'simba', 5, '2024-02-01'),
    (5, 'fohy', 60, '2024-02-02'),
    (5, 'simba', 5, '2024-02-02'),
    (6, 'fohy', 58, '2024-02-03'),
    (6, 'simba', 4, '2024-02-03'),
    
    -- atody id 7-9 (lot 3)
    (7, 'fohy', 110, '2024-02-01'),
    (7, 'simba', 10, '2024-02-01'),
    (8, 'fohy', 115, '2024-02-02'),
    (8, 'simba', 10, '2024-02-02'),
    (9, 'fohy', 120, '2024-02-03'),
    (9, 'simba', 10, '2024-02-03');
GO

-- ============================================
-- 7. Insertion dans la table prix_vente
-- ============================================
INSERT INTO prix_vente (id_race, prix_akoho_g, prix_atody_unitaire) VALUES
    (1, 0.60, 550),   -- Poulet de Bresse: 600 Ar/gramme, 550 Ar/oeuf
    (2, 0.75, 600),   -- Cochin: 750 Ar/g, 600 Ar/oeuf
    (3, 0.45, 450),   -- Leghorn: 450 Ar/g, 450 Ar/oeuf
    (4, 0.55, 500),   -- Sussex: 550 Ar/g, 500 Ar/oeuf
    (5, 0.65, 550),   -- Orpington: 650 Ar/g, 550 Ar/oeuf
    (6, 0.70, 580),   -- Brahma: 700 Ar/g, 580 Ar/oeuf
    (7, 0.50, 480),   -- Wyandotte: 500 Ar/g, 480 Ar/oeuf
    (8, 0.68, 600),   -- Marans: 680 Ar/g, 600 Ar/oeuf
    (9, 0.48, 450),   -- Australorp: 480 Ar/g, 450 Ar/oeuf
    (10, 0.62, 520);  -- Faverolles: 620 Ar/g, 520 Ar/oeuf
GO

-- ============================================
-- 8. Insertion dans la table prix_achat
-- ============================================
INSERT INTO prix_achat (id_race, prix_akoho_unitaire, prix_atody_unitaire) VALUES
    (1, 3000, 400),   -- Poulet de Bresse: 3000 Ar/poussin, 400 Ar/oeuf
    (2, 3500, 450),   -- Cochin: 3500 Ar/poussin, 450 Ar/oeuf
    (3, 2000, 300),   -- Leghorn: 2000 Ar/poussin, 300 Ar/oeuf
    (4, 2800, 380),   -- Sussex: 2800 Ar/poussin, 380 Ar/oeuf
    (5, 3200, 420),   -- Orpington: 3200 Ar/poussin, 420 Ar/oeuf
    (6, 3800, 480),   -- Brahma: 3800 Ar/poussin, 480 Ar/oeuf
    (7, 2500, 350),   -- Wyandotte: 2500 Ar/poussin, 350 Ar/oeuf
    (8, 3400, 440),   -- Marans: 3400 Ar/poussin, 440 Ar/oeuf
    (9, 2200, 320),   -- Australorp: 2200 Ar/poussin, 320 Ar/oeuf
    (10, 2900, 390);  -- Faverolles: 2900 Ar/poussin, 390 Ar/oeuf
GO

-- ============================================
-- Vérification des insertions
-- ============================================
SELECT 'race' AS table_name, COUNT(*) AS count FROM race
UNION ALL
SELECT 'lot', COUNT(*) FROM lot
UNION ALL
SELECT 'equivalence', COUNT(*) FROM equivalence
UNION ALL
SELECT 'akohoMaty', COUNT(*) FROM akohoMaty
UNION ALL
SELECT 'atody', COUNT(*) FROM atody
UNION ALL
SELECT 'etatAtody', COUNT(*) FROM etatAtody
UNION ALL
SELECT 'prix_vente', COUNT(*) FROM prix_vente
UNION ALL
SELECT 'prix_achat', COUNT(*) FROM prix_achat;
GO