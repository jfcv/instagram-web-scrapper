CREATE DATABASE iwsDatabase;

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    account TEXT
);

INSERT INTO accounts (account)
    VALUES  ('https://www.instagram.com/camilas18/?hl=es-la');