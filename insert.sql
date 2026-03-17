-- Active: 1772846088208@@127.0.0.1@1433@akoho
USE akoho_db_mety;
GO

-- 1. Insertion de la Race (Borbonèze)
INSERT INTO race (nom, percentMale, percentFemale, capPondaison, percentLamokana)
VALUES ('borbonèze', 1.0, 1.0, 1, 1.0); -- Valeurs par défaut basées sur votre écran précédent
GO

-- 2. Insertion des données d'équivalence (Semaines S1 à S25)
-- Note : J'utilise le prix_sakafo de 5 mentionné en cellule K2
INSERT INTO equivalence (numero_semaine, id_race, poids, sakafo, prix_sakafo)
VALUES 
(0, 1, 50, 0, 5),
(1, 1, 20, 75, 5),
(2, 1, 25, 80, 5),
(3, 1, 30, 100, 5),
(4, 1, 40, 150, 5),
(5, 1, 80, 170, 5),
(6, 1, 85, 190, 5),
(7, 1, 100, 200, 5),
(8, 1, 100, 250, 5),
(9, 1, 90, 270, 5),
(10, 1, 140, 290, 5),
(11, 1, 200, 300, 5),
(12, 1, 220, 370, 5),
(13, 1, 265, 390, 5),
(14, 1, 285, 350, 5),
(15, 1, 300, 300, 5),
(16, 1, 350, 450, 5),
(17, 1, 400, 500, 5),
(18, 1, 420, 400, 5),
(19, 1, 430, 500, 5),
(20, 1, 500, 500, 5),
(21, 1, 530, 650, 5),
(22, 1, 600, 600, 5),
(23, 1, 400, 750, 5),
(24, 1, 100, 750, 5),
(25, 1, 0, 600, 5);
GO

-- 3. Insertion du Lot initial (Lot 1)
INSERT INTO lot (nom, id_race, nombre, daty, origine, semaine_initial, prix_achat)
VALUES ('Lot 1', 1, 500, '2026-01-01', 'akoho', 0, 500);
GO

-- 4. Insertion des événements (Morts et Production d'atody)
INSERT INTO akohoMaty (id_lot, nombre, date)
VALUES (1, 15, '2026-02-01');

INSERT INTO atody (id_lot, nombre, date)
VALUES 
(1, 100, '2026-02-02'),
(1, 150, '2026-02-15');
GO

-- 5. Insertion des prix de vente et d'achat
INSERT INTO prix_vente (id_race, prix_akoho_g, prix_atody_unitaire)
VALUES (1, 15, 500); -- Basé sur les colonnes H2 (15) et K2 (500)

INSERT INTO prix_achat (id_race, semaine_initial, prix_akoho_unitaire, prix_atody_unitaire)
VALUES (1, 0, 500, 500);
GO