-- Queries for table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    quote VARCHAR(140)
);

INSERT INTO users(username, email, password, avatar, quote)
VALUES 
  ('Bolito', 'bolito@gmail.com', '123456', NULL, NULL),
  ('Hiria', 'hiria@gmail.com', '123456', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNC4cFAuyTCaleOBwCzVOh0yQ4SrwaYOdxZA&s', 'Miau'),
  ('Robin', 'robin@gmail.com', '123456', 'https://example.com/avatar_robin.png', '¡Hola mundo!');


SELECT *
FROM users


-- Queries or table videogames
CREATE TABLE videogames (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255) UNIQUE NOT NULL,
    image_url VARCHAR(255)
);

INSERT INTO videogames (name, description, image_url) VALUES 
('Terraria', 'Sandbox adventure game with crafting and exploration', 'https://example.com/terraria.jpg'),
('The Curse of Monkey Island', 'Classic point-and-click adventure game', 'https://example.com/monkey-island.jpg'),
('Portal 2', 'Puzzle-platform game with innovative mechanics', 'https://example.com/portal2.jpg'),
('Skyrim', 'Epic open-world RPG with dragons and magic', 'https://example.com/skyrim.jpg');

SELECT * 
FROM videogames

-- Queries for table completed
CREATE TABLE completed (
    id SERIAL PRIMARY KEY,
    id_user int NOT NULL,
    id_game int NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_game) REFERENCES videogames(id)
);

INSERT INTO completed (id_user, id_game) VALUES 
(1, 1), -- user1 completed Terraria
(2, 2), -- user2 completed The Curse of Monkey Island
(3, 3), -- user3 completed Portal 2
(1, 2); -- user1 complepted The Curse of Monkey Island

SELECT *
FROM completed

-- Get games a user has been completed
SELECT u.username, v.name
FROM users AS u
INNER JOIN completed AS c ON u.id = c.id_user
INNER JOIN videogames AS v ON v.id = c.id_game
WHERE u.username = 'Bolito';
