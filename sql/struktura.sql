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
    ) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `branches` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

CREATE TABLE
    `dish$ingredients` (
        `id` int NOT NULL AUTO_INCREMENT,
        `dish_id` int NOT NULL,
        `ingredient_id` int NOT NULL,
        `count` int NOT NULL,
        `line` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `ingredient_id` (`ingredient_id`),
        KEY `dish$ingredients_ibfk_1` (`dish_id`),
        CONSTRAINT `dish$ingredients_ibfk_1` FOREIGN KEY (`dish_id`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

CREATE TABLE
    `dish_categories` (
        `id` int NOT NULL,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

CREATE TABLE
    `dishes` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        `cost` int NOT NULL,
        `category_id` int NOT NULL DEFAULT '1',
        PRIMARY KEY (`id`),
        KEY `dishes_ibfk_1` (`category_id`),
        CONSTRAINT `dishes_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `dish_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

CREATE TABLE
    `ingredient_allergens` (
        `id` int NOT NULL AUTO_INCREMENT,
        `ingredient_id` int NOT NULL,
        `num` int NOT NULL,
        PRIMARY KEY (`id`),
        KEY `ingredient_allergens_ibfk_1` (`ingredient_id`),
        CONSTRAINT `ingredient_allergens_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

CREATE TABLE
    `ingredient_text_extensions` (
        `id` int NOT NULL AUTO_INCREMENT,
        `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

CREATE TABLE
    `ingredient_types` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `ingredient_types_name_IDX` (`name`) USING BTREE
    ) ENGINE = InnoDB AUTO_INCREMENT = 22 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

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
    ) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

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

CREATE TABLE
    `serve_type` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_czech_ci;

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