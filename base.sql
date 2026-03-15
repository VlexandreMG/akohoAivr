-- Active: 1772846088208@@127.0.0.1@1433@akoho
CREATE DATABASE akoho_db_mety;
GO

USE akoho_db_mety;
GO

CREATE TABLE race (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);
GO

CREATE TABLE lot (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    id_race INT NOT NULL,
    nombre INT NOT NULL CHECK (nombre > 0),
    daty DATE NOT NULL,
    origine VARCHAR(20) NOT NULL CHECK (origine IN ('atody', 'akoho')),
    semaine_initial INT NOT NULL CHECK (semaine_initial >= 0) DEFAULT 0,
);
GO

CREATE TABLE BilanLot (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_lot INT NOT NULL,
    nombre_poulets INT NOT NULL CHECK (nombre_poulets >= 0),
    prix_achat_total DECIMAL(10, 2) NOT NULL CHECK (prix_achat_total >= 0),
    cout_nourriture_total DECIMAL(10, 2) NOT NULL CHECK (cout_nourriture_total >= 0),
    nombre_morts INT,
    poids_moyen DECIMAL(10, 2),
    prix_vente_lot DECIMAL(10, 2),
    nombre_oeufs INT,
    valeur_oeufs_total DECIMAL(10, 2),
    benefice DECIMAL(10, 2)
);

CREATE TABLE equivalence (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    numero_semaine INT NOT NULL,
    id_race INT NOT NULL,
    poids DECIMAL(10, 2) NOT NULL,
    sakafo DECIMAL(10, 2) NOT NULL,
    prix_sakafo DECIMAL(10, 2) NOT NULL,
);
GO

CREATE TABLE akohoMaty (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_lot INT NOT NULL,
    nombre INT NOT NULL CHECK (nombre > 0),
    date DATE NOT NULL
);
GO

CREATE TABLE atody (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_lot INT NOT NULL,
    nombre INT NOT NULL CHECK (nombre >= 0),
    date DATE NOT NULL
);
GO

CREATE TABLE etatAtody (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_atody INT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (
        type IN ('fohy', 'simba')
    ),
    nombre INT NOT NULL CHECK (nombre >= 0),
    date DATE NOT NULL
);
GO

CREATE TABLE prix_vente (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_race INT NOT NULL,
    prix_akoho_g DECIMAL(10, 2) NOT NULL CHECK (prix_akoho_g >= 0),
    prix_atody_unitaire DECIMAL(10, 2) NOT NULL CHECK (prix_atody_unitaire >= 0)
);
GO

CREATE TABLE prix_achat (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_race INT NOT NULL,
    semaine_initial INT NOT NULL CHECK (semaine_initial >= 0) DEFAULT 0,
    prix_akoho_unitaire DECIMAL(10, 2) NOT NULL CHECK (prix_akoho_unitaire >= 0),
    prix_atody_unitaire DECIMAL(10, 2) NOT NULL CHECK (prix_atody_unitaire >= 0)
);
GO

INSERT INTO prix_sakafo (nom, prix, daty)
VALUES 
('starter', 2500, '2026-03-01'),
('grower', 2300, '2026-03-01'),
('finisher', 2200, '2026-03-01');