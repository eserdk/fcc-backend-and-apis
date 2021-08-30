CREATE TABLE users IF NOT EXISTS
(
    PRIMARY
    KEY
    id
    VARCHAR,
    username
    VARCHAR
    UNIQUE
);

CREATE TABLE exercises IF NOT EXISTS
(
    PRIMARY
    KEY
    id
    VARCHAR,
    description
    VARCHAR,
    duration
    VARCHAR,
    date
    TIMESTAMP,
    FOREIGN
    KEY
(
    user_id
)
    );