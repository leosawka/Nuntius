CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL,
  date DATE NOT NULL
);

INSERT INTO news (title, body, image_url, author, date) VALUES
('First news', 'This is the content of the first news.', 'https://placehold.co/300x200', 'Jairo', '2024-03-20'),
('Second news', 'Content of the second news.', 'https://placehold.co/300x200', 'Sawka', '2024-03-25');
