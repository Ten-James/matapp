INSERT INTO `serve_type` VALUES (1, "open");

INSERT INTO `serve_type` VALUES (2, "submitted");

INSERT INTO `serve_type` VALUES (3, "finished");

ALTER TABLE `serves` ADD `display_id` INTEGER NOT NULL DEFAULT 0;