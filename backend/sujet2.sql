CREATE DATABASE akoho_lol;
GO

USE akoho_lol;
GO

CREATE TABLE race (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    created_at DATETIME DEFAULT GETDATE(),
    temps_pondaison INT NOT NULL CHECK (temps_pondaison > 0),
    pourcentage_femelle DECIMAL(5, 2) NOT NULL CHECK (pourcentage_femelle >= 0 AND pourcentage_femelle <= 100),
    pourcentage_morte_femelle DECIMAL(5, 2) NOT NULL CHECK (pourcentage_morte_femelle >= 0 AND pourcentage_morte_femelle <= 100),
    capacite_pondaison INT NOT NULL CHECK (capacite_pondaison > 0),
    pourcentage_morte_atody DECIMAL(5, 2) NOT NULL CHECK (pourcentage_morte_atody >= 0 AND pourcentage_morte_atody <= 100)
);
GO

CREATE TABLE lot (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    id_race INT NOT NULL,
    nombre INT NOT NULL CHECK (nombre > 0),
    daty DATE NOT NULL,
    origine VARCHAR(20) NOT NULL CHECK (origine IN ('atody', 'akoho')) default 'akoho',
    semaine_initial INT NOT NULL CHECK (semaine_initial >= 0) DEFAULT 0,
    prix_achat DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (prix_achat >= 0),
    FOREIGN KEY (id_race) REFERENCES race (id) ON DELETE CASCADE
);
GO

CREATE TABLE equivalence (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    numero_semaine INT NOT NULL,
    id_race INT NOT NULL,
    poids DECIMAL(10, 2) NOT NULL,
    sakafo DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_race) REFERENCES race (id) ON DELETE CASCADE
);
GO

CREATE TABLE akohoMaty (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_lot INT NOT NULL,
    nombre INT NOT NULL CHECK (nombre > 0),
    date DATE NOT NULL,
    cause VARCHAR(255) NULL,
    FOREIGN KEY (id_lot) REFERENCES lot (id) ON DELETE CASCADE
);
GO

CREATE TABLE atody (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_lot INT NOT NULL,
    nombre INT NOT NULL CHECK (nombre >= 0),
    date DATE NOT NULL,
    FOREIGN KEY (id_lot) REFERENCES lot (id) ON DELETE CASCADE
);
GO

CREATE TABLE etatAtody (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_lot INT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (
        type IN ('fohy', 'simba')
    ),
    nombre INT NOT NULL CHECK (nombre >= 0),
    date DATE NOT NULL,
    FOREIGN KEY (id_lot) REFERENCES lot (id) ON DELETE CASCADE
);
GO

CREATE TABLE prix_vente (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_race INT NOT NULL,
    prix_akoho_g DECIMAL(10, 2) NOT NULL CHECK (prix_akoho_g >= 0),
    prix_atody_unitaire DECIMAL(10, 2) NOT NULL CHECK (prix_atody_unitaire >= 0),
    FOREIGN KEY (id_race) REFERENCES race (id) ON DELETE CASCADE
);
GO

CREATE TABLE prix_achat (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    id_race INT NOT NULL,
    semaine_initial INT NOT NULL CHECK (semaine_initial >= 0) DEFAULT 0,
    prix_akoho_unitaire DECIMAL(10, 2) NOT NULL CHECK (prix_akoho_unitaire >= 0),
    prix_atody_unitaire DECIMAL(10, 2) NOT NULL CHECK (prix_atody_unitaire >= 0),
    FOREIGN KEY (id_race) REFERENCES race (id) ON DELETE CASCADE
);
GO

CREATE TABLE prix_sakafo (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prix DECIMAL(10,2) NOT NULL CHECK (prix > 0),
    daty DATE NOT NULL
);
GO




INSERT INTO prix_sakafo (nom, prix, daty)
VALUES 
('starter', 2500, '2026-03-01'),
('grower', 2300, '2026-03-01'),
('finisher', 2200, '2026-03-01');


--changer la table etatAtody pour changer id_atody en id_lot
-- ALTER TABLE etatAtody
-- DROP CONSTRAINT FK__etatAtody__id_at__619B8048;
-- GO
-- ALTER TABLE etatAtody
-- DROP COLUMN id_atody;
-- GO
-- ALTER TABLE etatAtody
-- ADD id_lot INT NOT NULL;
-- GO
-- ALTER TABLE etatAtody
-- ADD FOREIGN KEY (id_lot) REFERENCES lot (id) ON DELETE CASCADE;
-- GO