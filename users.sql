DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      profileimg VARCHAR(255),
      bio TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

DROP TABLE IF EXISTS reset_codes CASCADE;

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  DROP TABLE IF EXISTS friendships CASCADE;

   CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) ON DELETE CASCADE,
   recipient_id INT REFERENCES users(id) ON DELETE CASCADE,
   accepted BOOLEAN DEFAULT false
 );

DROP TABLE IF EXISTS chat CASCADE;

CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    message VARCHAR NOT NULL,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat (message, sender_id) VALUES('How was the bootcamp?',1);
INSERT INTO chat (message, sender_id) VALUES('Sanity Check!',2);