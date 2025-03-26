-- creo la base 
CREATE DATABASE moviesdb;

-- uso la base
USE moviesdb;

-- creo la tabla
CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2,1) UNSIGNED NOT NULL 
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genre(
	movie_id BINARY(16) REFERENCES movies(id),
    genre_id INT REFERENCES genres(id),
    PRIMARY KEY (movie_id, genre_id)
);

-- RENAME TABLE move_genre TO movie_genre;

-- inserto los géneros
INSERT INTO genre(name) VALUES
	('Action'),
    ('Adventure'),
    ('Animation'),
    ('Biography'),
    ('Crime'),
    ('Drama'),
    ('Fantasy'),
    ('Romance'),
    ('Sci-Fi'),
    ('Thriller');

-- inserto las películas
INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
(UUID_TO_BIN('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
(UUID_TO_BIN('5ad1a235-0d9c-410a-b32b-220d91689a08'), 'Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
(UUID_TO_BIN('241bf55d-b649-4109-af7c-0e6890ded3fc'), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9);

INSERT INTO movie_genre (movie_id, genre_id) VALUES
((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),

((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Crime')),
((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Drama')),

((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Adventure')),
((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Crime')),
((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Drama'));


SELECT * FROM movie;

SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;

SELECT * FROM genre;
SELECT * FROM movie_genre;