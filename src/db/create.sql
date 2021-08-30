CREATE TABLE IF NOT EXISTS users
(
    id       UUID PRIMARY KEY,
    username VARCHAR UNIQUE
);

CREATE TABLE IF NOT EXISTS exercises
(
    id          VARCHAR PRIMARY KEY,
    description VARCHAR,
    duration    INT,
    date        DATE DEFAULT CURRENT_DATE NOT NULL,
    user_id     UUID,
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users
);