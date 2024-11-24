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
    id_user INT NOT NULL,
    id_game INT NOT NULL,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    PRIMARY KEY (id_user, id_game), 
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_game) REFERENCES videogames(id)
);

INSERT INTO completed (id_user, id_game, rating, review, date) 
VALUES 
(1, 1, 5, 'Terraria is a popular 2D sandbox adventure game where players explore, mine, craft, and build in a procedurally generated world. With endless biomes, resources, and enemies, players can create their own structures, fight powerful bosses, and discover new items. The game features a deep crafting system, allowing for endless customization of weapons, tools, and armor. Terraria''s engaging gameplay, pixel art style, and constant updates have made it a fan favorite for years.', CURRENT_TIMESTAMP), -- user1 completed Terraria
(2, 2, 4, 'The Curse of Monkey Island is a classic point-and-click adventure game where players follow Guybrush Threepwood on a comedic quest to break a curse. Filled with quirky puzzles, memorable characters, and witty dialogue, this game is a standout in the Monkey Island series. Its vibrant art style, engaging story, and humorous charm make it a must-play for fans of adventure games.', CURRENT_TIMESTAMP), -- user2 completed The Curse of Monkey Island
(3, 3, NULL, NULL, CURRENT_TIMESTAMP), -- user3 completed Portal 2 (no review or rating provided)
(1, 2, 5, 'The Curse of Monkey Island is a fantastic adventure game full of humor, puzzles, and memorable characters. Guybrush Threepwood’s witty charm shines throughout, making the journey enjoyable and fun. The vibrant visuals and clever puzzles add to the overall experience, making it one of the best in the series.', CURRENT_TIMESTAMP); -- user1 completed The Curse of Monkey Island with review and rating

SELECT *
FROM completed;

SELECT u.username, v.name, c.rating,  c.date, c.review
FROM users AS u
INNER JOIN completed AS c ON u.id = c.id_user
INNER JOIN videogames AS v ON v.id = c.id_game
WHERE u.username = 'BolitoKatas';

DELETE FROM completed
WHERE id_user = 2 AND id_game = 2;
