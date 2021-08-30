CREATE TABLE IF NOT EXISTS users
(
    id       VARCHAR PRIMARY KEY,
    username VARCHAR unique
);

CREATE TABLE IF NOT EXISTS exercises
(
    id          VARCHAR PRIMARY KEY,
    description VARCHAR,
    duration    VARCHAR,
    date        TIMESTAMP,
    user_id     VARCHAR,
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users
);