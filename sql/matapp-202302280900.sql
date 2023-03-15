-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)

--

-- Host: localhost    Database: matapp

-- ------------------------------------------------------

-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */

;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */

;

/*!50503 SET NAMES utf8mb4 */

;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */

;

/*!40103 SET TIME_ZONE='+00:00' */

;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */

;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */

;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */

;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */

;

--

-- Table structure for table `branch$ingredients`

--

DROP TABLE IF EXISTS `branch$ingredients`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `branch$ingredients` (
        `id` int NOT NULL AUTO_INCREMENT,
        `branch_id` int NOT NULL,
        `ingredient_id` int NOT NULL,
        `count` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `ingredient_id` (`ingredient_id`),
        KEY `branch$ingredients_ibfk_1` (`branch_id`),
        CONSTRAINT `branch$ingredients_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `branch$ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `dishes`

--

DROP TABLE IF EXISTS `dishes`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `dishes` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `cost` int NOT NULL,
        `category_id` int NOT NULL DEFAULT '1',
        PRIMARY KEY (`id`),
        KEY `dishes_ibfk_1` (`category_id`),
        CONSTRAINT `dishes_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `dish_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `serve_type`

--

DROP TABLE IF EXISTS `serve_type`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `serve_type` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `users`

--

DROP TABLE IF EXISTS `users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `users` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `branch_id` int DEFAULT NULL,
        `access` int NOT NULL DEFAULT '0',
        PRIMARY KEY (`id`),
        UNIQUE KEY `name` (`name`),
        KEY `users_ibfk_1` (`branch_id`),
        CONSTRAINT `users_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `branches`

--

DROP TABLE IF EXISTS `branches`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `branches` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `serve_sessions`

--

DROP TABLE IF EXISTS `serve_sessions`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `serve_sessions` (
        `id` int NOT NULL AUTO_INCREMENT,
        `branch_id` int NOT NULL,
        `s_date` date NOT NULL,
        `e_date` date NOT NULL,
        PRIMARY KEY (`id`),
        KEY `serve_sessions_ibfk_1` (`branch_id`),
        CONSTRAINT `serve_sessions_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `ingredient_allergens`

--

DROP TABLE IF EXISTS `ingredient_allergens`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `ingredient_allergens` (
        `id` int NOT NULL AUTO_INCREMENT,
        `ingredient_id` int NOT NULL,
        `num` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `ingredient_allergens_ibfk_1` (`ingredient_id`),
        CONSTRAINT `ingredient_allergens_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 20 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `serve$dishes`

--

DROP TABLE IF EXISTS `serve$dishes`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `serve$dishes` (
        `id` int NOT NULL AUTO_INCREMENT,
        `serve_id` int NOT NULL,
        `dish_id` int NOT NULL,
        `count` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `serve_id` (`serve_id`),
        KEY `serve$dishes_ibfk_2` (`dish_id`),
        CONSTRAINT `serve$dishes_ibfk_1` FOREIGN KEY (`serve_id`) REFERENCES `serves` (`id`),
        CONSTRAINT `serve$dishes_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `ingredients`

--

DROP TABLE IF EXISTS `ingredients`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `ingredients` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `ingredient_type_id` int NOT NULL,
        `cost` int NOT NULL DEFAULT '0',
        `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
        `ingredient_text_extension_id` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `ingredients_FK` (
            `ingredient_text_extension_id`
        ),
        KEY `ingredients_ibfk_1` (`ingredient_type_id`),
        CONSTRAINT `ingredients_FK` FOREIGN KEY (
            `ingredient_text_extension_id`
        ) REFERENCES `ingredient_text_extensions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`ingredient_type_id`) REFERENCES `ingredient_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 20 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `serves`

--

DROP TABLE IF EXISTS `serves`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `serves` (
        `id` int NOT NULL AUTO_INCREMENT,
        `serve_date` date NOT NULL,
        `session_id` int NOT NULL,
        `type_id` int NOT NULL,
        `cost` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `type_id` (`type_id`),
        KEY `serves_ibfk_1` (`session_id`),
        CONSTRAINT `serves_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `serve_sessions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `serves_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `serve_type` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `ingredient_text_extensions`

--

DROP TABLE IF EXISTS `ingredient_text_extensions`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `ingredient_text_extensions` (
        `id` int NOT NULL AUTO_INCREMENT,
        `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `ingredient_types`

--

DROP TABLE IF EXISTS `ingredient_types`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `ingredient_types` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `ingredient_types_name_IDX` (`name`) USING BTREE
    ) ENGINE = InnoDB AUTO_INCREMENT = 26 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `dish$ingredients`

--

DROP TABLE IF EXISTS `dish$ingredients`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `dish$ingredients` (
        `id` int NOT NULL AUTO_INCREMENT,
        `dish_id` int NOT NULL,
        `ingredient_id` int NOT NULL,
        `count` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `ingredient_id` (`ingredient_id`),
        KEY `dish$ingredients_ibfk_1` (`dish_id`),
        CONSTRAINT `dish$ingredients_ibfk_1` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 38 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Table structure for table `dish_categories`

--

DROP TABLE IF EXISTS `dish_categories`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `dish_categories` (
        `id` int NOT NULL,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `icon` varchar(255) COLLATE utf8mb4_czech_ci DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `dish_categories_UN` (`name`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */

;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */

;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */

;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */

;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */

;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */

;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */

;

-- Dump completed on 2023-02-28  9:01:00