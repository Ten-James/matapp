CREATE table
    serve_sessions (
        id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
        branch_id integer not null,
        s_date DATE NOT NULL,
        e_date DATE NOT NULL
    );

CREATE table
    ingredients (
        id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        ingredient_type_id INTEGER not null
    );

CREATE TABLE
    ingredients_types(
        id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `name` varchar(255) not null
    );

CREATE table
    dishes (
        id integer primary key not null AUTO_INCREMENT,
        `name` varchar(255) not null,
        cost integer not null
    );

create table
    dish$ingredients (
        id integer primary key not null AUTO_INCREMENT,
        dish_id integer not null,
        ingredient_id integer not null,
        `count` integer not null
    );

create table
    serves (
        id integer primary key not null AUTO_INCREMENT,
        serve_date date not null,
        session_id integer not null,
        type_id integer not null
    );

create table
    serve_type (
        id integer primary key not null AUTO_INCREMENT,
        `name` varchar(255) not null
    );

create table
    serve$dishes (
        id integer primary key not null auto_increment,
        serve_id integer not null,
        dish_id integer not null,
        `count` integer not null
    );

create table
    branches (
        id integer primary key not null auto_increment,
        `name` varchar(255) not null,
        `location` varchar(255) not null
    );

CREATE Table
    users(
        id integer primary key not null auto_increment,
        name varchar(255) not null unique,
        password varchar(255) not null,
        branch_id integer,
        access integer not null default 0
    );

-- alter tables

ALTER TABLE serve_sessions
ADD
    FOREIGN KEY (branch_id) REFERENCES branches(id);

ALTER TABLE dish$ingredients
ADD
    FOREIGN KEY (dish_id) REFERENCES dishes(id);

ALTER TABLE dish$ingredients
ADD
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id);

ALTER TABLE serves
ADD
    FOREIGN KEY (session_id) REFERENCES serve_sessions(id);

ALTER TABLE serves
ADD
    FOREIGN KEY (type_id) REFERENCES serve_type(id);

ALTER TABLE serve$dishes
ADD
    FOREIGN KEY (serve_id) REFERENCES serves(id);

ALTER TABLE serve$dishes
ADD
    FOREIGN KEY (dish_id) REFERENCES dishes(id);

ALTER TABLE ingredients
ADD
    FOREIGN KEY (ingredient_type_id) REFERENCES ingredients_types(id);