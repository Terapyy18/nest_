-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 24 fév. 2026 à 16:52
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nest`
--

-- --------------------------------------------------------

--
-- Structure de la table `product_config`
--

CREATE TABLE `product_config` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'DRAFT',
  `salesChannelId` varchar(255) DEFAULT NULL,
  `shippingProfileId` varchar(255) DEFAULT NULL,
  `otherCosts` decimal(10,2) NOT NULL DEFAULT 0.00,
  `totalCost` decimal(10,2) DEFAULT NULL,
  `finalPrice` decimal(10,2) DEFAULT NULL,
  `desiredMargin` decimal(5,4) NOT NULL DEFAULT 0.2000,
  `electricityPrice` decimal(5,4) NOT NULL DEFAULT 0.2000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `product_config`
--

INSERT INTO `product_config` (`id`, `name`, `status`, `salesChannelId`, `shippingProfileId`, `otherCosts`, `totalCost`, `finalPrice`, `desiredMargin`, `electricityPrice`) VALUES
('3f456a6b-f856-422b-bd12-8f5994af4f4c', 'Bracket de renforcment modulaire', 'DRAFT', '295ae173-05dc-48c3-85e6-be26af31f76f', '8dc82cb9-e8f4-491b-a694-c1e543bbe284', 2.50, 18.77, 28.77, 0.2500, 0.2000);

-- --------------------------------------------------------

--
-- Structure de la table `product_config_part`
--

CREATE TABLE `product_config_part` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Part',
  `productConfigId` varchar(255) NOT NULL,
  `printerId` varchar(255) NOT NULL,
  `materialId` varchar(255) NOT NULL,
  `printTimeHours` float NOT NULL,
  `weightGrams` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `product_config_part`
--

INSERT INTO `product_config_part` (`id`, `name`, `productConfigId`, `printerId`, `materialId`, `printTimeHours`, `weightGrams`) VALUES
('a7e82479-4566-497f-a9d3-b6713a8d95f2', 'Support bracket', '3f456a6b-f856-422b-bd12-8f5994af4f4c', 'e511a87a-9125-4b39-b358-8e6b5a1c5d48', 'faf03f09-7537-4143-a27f-2a7f40327eac', 1.5, 75),
('dc879da3-1a72-4175-8ced-dfeb04473789', 'Base plate', '3f456a6b-f856-422b-bd12-8f5994af4f4c', 'e511a87a-9125-4b39-b358-8e6b5a1c5d48', 'faf03f09-7537-4143-a27f-2a7f40327eac', 2.5, 150);

-- --------------------------------------------------------

--
-- Structure de la table `rsc_material`
--

CREATE TABLE `rsc_material` (
  `id` varchar(36) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `weightGrams` int(11) NOT NULL DEFAULT 1000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rsc_material`
--

INSERT INTO `rsc_material` (`id`, `brand`, `type`, `price`, `weightGrams`) VALUES
('36b80153-a1ee-4577-b3c0-c0cbf1df6be8', 'Bambu Lab', 'ABS-CF', 30, 1000),
('94bb3523-fca3-4ed8-9dc2-caf7089d7b9c', 'Bambu Lab', 'PETG', 25, 1000),
('96e3a815-be7f-47fd-b148-8044aea26e2d', 'Bambu Lab', 'TPU', 23, 1000),
('d750ad00-c417-4da7-bddc-82147ff3641a', 'Bambu Lab', 'ABS', 30, 1000),
('dcc7e3f8-19a1-48d2-99fc-b38cd2a13c65', 'Bambu Lab', 'PETG-CF', 23, 1000),
('eec58422-653e-4af6-b771-8eed7a9113c6', 'Bambu Lab', 'PLA WOOD', 12, 1000),
('faf03f09-7537-4143-a27f-2a7f40327eac', 'Bambu Lab', 'PLA', 20, 1000);

-- --------------------------------------------------------

--
-- Structure de la table `rsc_printer`
--

CREATE TABLE `rsc_printer` (
  `id` varchar(36) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `powerConsumptionWatts` decimal(10,0) NOT NULL,
  `acquisitionCost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `maintenanceHourlyCost` decimal(10,2) NOT NULL DEFAULT 0.50
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rsc_printer`
--

INSERT INTO `rsc_printer` (`id`, `brand`, `model`, `powerConsumptionWatts`, `acquisitionCost`, `maintenanceHourlyCost`) VALUES
('164d9c7b-2668-4f54-af71-82153b14b41f', 'Bambu Lab', 'P1S', 230, 0.00, 0.50),
('206028c2-a85a-4309-a910-84479e00c45c', 'Bambu Lab', 'H2S', 330, 0.00, 0.50),
('549bcaf8-e79a-4643-990c-b19c26050ac4', 'Bambu Lab', 'A1', 150, 0.00, 0.50),
('57324bf6-2a44-4de6-9ead-ec6ad5bc65f4', 'Bambu Lab', 'A1 mini', 120, 0.00, 0.50),
('7a5b4a64-c4ea-487a-8f09-f5f2cd893a18', 'Bambu Lab', 'P2S', 230, 0.00, 0.50),
('b8a6cac7-db59-41ed-ba87-d70f89a21848', 'Bambu Lab', 'P1P', 250, 0.00, 0.50),
('e511a87a-9125-4b39-b358-8e6b5a1c5d48', 'Bambu Lab', 'X1 Carbon', 350, 0.00, 0.50);

-- --------------------------------------------------------

--
-- Structure de la table `rsc_sales_channel`
--

CREATE TABLE `rsc_sales_channel` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `commissionPercentage` decimal(5,4) NOT NULL DEFAULT 0.0000,
  `fixedTransactionFee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `feesApplyToShipping` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rsc_sales_channel`
--

INSERT INTO `rsc_sales_channel` (`id`, `name`, `commissionPercentage`, `fixedTransactionFee`, `feesApplyToShipping`) VALUES
('295ae173-05dc-48c3-85e6-be26af31f76f', 'Amazon', 0.1500, 0.99, 1);

-- --------------------------------------------------------

--
-- Structure de la table `rsc_shipping_profile`
--

CREATE TABLE `rsc_shipping_profile` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `carrierCost` decimal(10,2) NOT NULL,
  `packagingCost` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rsc_shipping_profile`
--

INSERT INTO `rsc_shipping_profile` (`id`, `name`, `carrierCost`, `packagingCost`) VALUES
('8dc82cb9-e8f4-491b-a694-c1e543bbe284', 'Standard Shipping', 7.99, 1.50);

-- --------------------------------------------------------

--
-- Structure de la table `user_credentials`
--

CREATE TABLE `user_credentials` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `permissions` bigint(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_credentials`
--

INSERT INTO `user_credentials` (`id`, `email`, `password_hash`, `created_at`, `permissions`) VALUES
('5a3058cd-84cc-498f-a085-23f7057850a4', 'test@example.com', '$2b$12$wVX36hj4AwW5KxGQ.Ut37exXa9TVVnFIi5m6hCytAgk3ytIdtp0ha', '0000-00-00 00:00:00', 4095);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `product_config`
--
ALTER TABLE `product_config`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_284340c6c36c1ed1df6eb65e582` (`salesChannelId`),
  ADD KEY `FK_21221f4331a7bdcccdd445cb236` (`shippingProfileId`);

--
-- Index pour la table `product_config_part`
--
ALTER TABLE `product_config_part`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_cf8ac74e4bff621d0b8d1737e08` (`productConfigId`),
  ADD KEY `FK_4774ef3e83066273d4c191752b6` (`printerId`),
  ADD KEY `FK_024ad955a0b36d6d6e6d57fc102` (`materialId`);

--
-- Index pour la table `rsc_material`
--
ALTER TABLE `rsc_material`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rsc_printer`
--
ALTER TABLE `rsc_printer`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rsc_sales_channel`
--
ALTER TABLE `rsc_sales_channel`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rsc_shipping_profile`
--
ALTER TABLE `rsc_shipping_profile`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_credentials`
--
ALTER TABLE `user_credentials`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8e125b82911b4715b635dcf2fd` (`email`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `product_config`
--
ALTER TABLE `product_config`
  ADD CONSTRAINT `FK_21221f4331a7bdcccdd445cb236` FOREIGN KEY (`shippingProfileId`) REFERENCES `rsc_shipping_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_284340c6c36c1ed1df6eb65e582` FOREIGN KEY (`salesChannelId`) REFERENCES `rsc_sales_channel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `product_config_part`
--
ALTER TABLE `product_config_part`
  ADD CONSTRAINT `FK_024ad955a0b36d6d6e6d57fc102` FOREIGN KEY (`materialId`) REFERENCES `rsc_material` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_4774ef3e83066273d4c191752b6` FOREIGN KEY (`printerId`) REFERENCES `rsc_printer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_cf8ac74e4bff621d0b8d1737e08` FOREIGN KEY (`productConfigId`) REFERENCES `product_config` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
