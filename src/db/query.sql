-- CREATE TABLE users(
--     id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
--     userId VARCHAR(60) NOT NULL,
--     userName VARCHAR(60) NOT NULL,
--     lastName VARCHAR(60) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     address VARCHAR(155) NOT NULL,
--     phone VARCHAR(60) NOT NULL
-- );

-- CREATE TABLE publicMessages(
--     id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
--     userId INTEGER NOT NULL,
--     message TEXT NOT NULL,
--     FOREIGN KEY(userId) REFERENCES users(id)
-- );

-- ALTER TABLE publicMessages ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;