-- QUERIES FOR TABLE USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    quote VARCHAR(140)
);

SELECT *
FROM users

INSERT INTO users(username, email, password, avatar, quote)
VALUES 
  ('Bolito92','bolito@gmail.com', '123456', NULL, NULL),
  ('Hiriosa', 'hiria@gmail.com', '123456', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNC4cFAuyTCaleOBwCzVOh0yQ4SrwaYOdxZA&s', 'Miau'),
  ('Robinoso', 'robin@gmail.com', '123456', 'https://example.com/avatar_robin.png', '¡Hola mundo!');

UPDATE users
    SET username = 'Bolito_92', password = '12234567aA', avatar = 'a', quote = 'Así es'
    WHERE email = 'bolito@gmail.com'

SELECT *
FROM users

-- QUERIES FOR TABLE VIDEOGAMES
CREATE TABLE videogames (
    id INT UNIQUE NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    background_image VARCHAR(255)
);

INSERT INTO videogames (id, name, background_image) VALUES 
(123, 'Terraria', 'https://example.com/terraria.jpg'),
(124, 'The Curse of Monkey Island', 'https://example.com/monkey-island.jpg'),
(125, 'Portal 2', 'https://example.com/portal2.jpg'),
(126, 'Skyrim', 'https://example.com/skyrim.jpg')

SELECT * 
FROM videogames

-- QUERIES FOR TABLE FAVORITES
CREATE TABLE favorites (
    id_user INT NOT NULL,
    id_game INT NOT NULL,
	date DATE NOT NULL,
    PRIMARY KEY (id_user, id_game),
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_game) REFERENCES videogames(id)
);

INSERT INTO favorites (id_user, id_game, date) 
VALUES 
(1, 124, CURRENT_TIMESTAMP), -- user1 favorited The Curse of Monkey Island
(2, 124, CURRENT_TIMESTAMP), -- user2 favorited The Curse of Monkey Island
(3, 125, CURRENT_TIMESTAMP), -- user3 favorited Portal 2
(3, 124, CURRENT_TIMESTAMP); -- user1 favorited The Curse of Monkey Island


SELECT *
FROM favorites;

SELECT u.username, v.name
FROM users as u
INNER JOIN favorites as f ON u.id = f.id_user
INNER JOIN videogames as v ON f.id_game = v.id
WHERE u.username='Robinoso'


-- QUERIES FOR TABLE WISHLISTED
CREATE TABLE wishlisted (
    id_user INT NOT NULL,
    id_game INT NOT NULL,
	date DATE NOT NULL,
	PRIMARY KEY (id_user, id_game),
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_game) REFERENCES videogames(id)
);

INSERT INTO wishlisted (id_user, id_game, date) 
VALUES 
(1, 124, CURRENT_TIMESTAMP), -- user1 favorited The Curse of Monkey Island
(1, 125, CURRENT_TIMESTAMP), -- user1 favorited The Curse of Monkey Island
(1, 126, CURRENT_TIMESTAMP), -- user1 favorited Portal 2
(3, 124, CURRENT_TIMESTAMP); -- user3 favorited The Curse of Monkey Island


SELECT *
FROM wishlisted;

SELECT u.username, v.name
FROM users as u
INNER JOIN wishlisted as w ON u.id = w.id_user
INNER JOIN videogames as v ON w.id_game = v.id
WHERE u.username='Bolito_92'

-- QUERIES FOR TABLE COMPLETED
CREATE TABLE completed (
    id_user INT NOT NULL,
    id_game INT NOT NULL,
	date DATE NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    PRIMARY KEY (id_user, id_game),
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_game) REFERENCES videogames(id)
);

INSERT INTO completed (id_user, id_game, date, rating, review) 
VALUES 
(1, 123, CURRENT_TIMESTAMP, 5, 'Terraria is a popular 2D sandbox adventure game where players explore, mine, craft, and build in a procedurally generated world. With endless biomes, resources, and enemies, players can create their own structures, fight powerful bosses, and discover new items. The game features a deep crafting system, allowing for endless customization of weapons, tools, and armor. Terraria''s engaging gameplay, pixel art style, and constant updates have made it a fan favorite for years.'), -- user1 completed Terraria
(2, 124, CURRENT_TIMESTAMP, 4, 'The Curse of Monkey Island is a classic point-and-click adventure game where players follow Guybrush Threepwood on a comedic quest to break a curse. Filled with quirky puzzles, memorable characters, and witty dialogue, this game is a standout in the Monkey Island series. Its vibrant art style, engaging story, and humorous charm make it a must-play for fans of adventure games.'), -- user2 completed The Curse of Monkey Island
(3, 125, CURRENT_TIMESTAMP, NULL, NULL), -- user3 completed Portal 2 (no review or rating provided)
(1, 124, CURRENT_TIMESTAMP, 5, 'The Curse of Monkey Island is a fantastic adventure game full of humor, puzzles, and memorable characters. Guybrush Threepwood’s witty charm shines throughout, making the journey enjoyable and fun. The vibrant visuals and clever puzzles add to the overall experience, making it one of the best in the series.'); -- user1 completed The Curse of Monkey Island with review and rating


SELECT *
FROM completed;

SELECT u.username, v.name, v.background_image, c.rating,  c.date, c.review
FROM users AS u
INNER JOIN completed AS c ON u.id = c.id_user
INNER JOIN videogames AS v ON v.id = c.id_game
WHERE u.username = 'Bolito_92';

DELETE FROM completed
WHERE id_user = 2 AND id_game = 2;
