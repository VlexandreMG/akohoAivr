-- ── 1. Désactiver les contraintes FK ──
EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL';
GO

-- ── 2. Vider toutes les tables ──
DELETE FROM etatAtody;
DELETE FROM atody;
DELETE FROM akohoMaty;
DELETE FROM prix_vente;
DELETE FROM prix_achat;
DELETE FROM equivalence;
DELETE FROM prix_sakafo;
DELETE FROM lot;
DELETE FROM race;
GO

-- ── 3. Réinitialiser les auto-incréments à 1 ──
DBCC CHECKIDENT ('etatAtody',   RESEED, 0);
DBCC CHECKIDENT ('atody',       RESEED, 0);
DBCC CHECKIDENT ('akohoMaty',   RESEED, 0);
DBCC CHECKIDENT ('prix_vente',  RESEED, 0);
DBCC CHECKIDENT ('prix_achat',  RESEED, 0);
DBCC CHECKIDENT ('equivalence', RESEED, 0);
DBCC CHECKIDENT ('prix_sakafo', RESEED, 0);
DBCC CHECKIDENT ('lot',         RESEED, 0);
DBCC CHECKIDENT ('race',        RESEED, 0);
GO

-- ── 4. Réactiver les contraintes FK ──
EXEC sp_MSforeachtable 'ALTER TABLE ? CHECK CONSTRAINT ALL';
GO

-- ── 5. Réinsérer les données de base ──
INSERT INTO prix_sakafo (nom, prix, daty)
VALUES 
('starter',  2500, '2026-03-01'),
('grower',   2300, '2026-03-01'),
('finisher', 2200, '2026-03-01');
GO