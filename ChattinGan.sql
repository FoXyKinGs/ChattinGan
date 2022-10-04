-- -------------------------------------------------------------
-- TablePlus 5.0.0(454)
--
-- https://tableplus.com/
--
-- Database: ChattinGan
-- Generation Time: 2022-10-04 12:36:36.8340
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."chat";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS chats_id_seq;

-- Table Definition
CREATE TABLE "public"."chat" (
    "id" int4 NOT NULL DEFAULT nextval('chats_id_seq'::regclass),
    "from_id" varchar(255) NOT NULL,
    "to_id" varchar(255) NOT NULL,
    "message" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "room_id" varchar(255) NOT NULL,
    "username" varchar(32) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."chat" ("id", "from_id", "to_id", "message") VALUES
(1, '1', '2', 'Hallo'),
(2, '1', '2', 'Hallo'),
(3, '2', '1', 'Yoo');

INSERT INTO "public"."users" ("id", "room_id", "username", "email", "password") VALUES
(1, '20229315395348134', 'john', 'john.mail@mail.com', '$2b$10$tBQ0mdFN1Xbhg3.Ijwh9N.kwTbMiKoLsPfV1bmnyvD6groCGT1rMu'),
(2, '20229315401028948', 'steve', 'steve.mail@mail.com', '$2b$10$P5rvFfVIByYidnkbp.UA.undDkt6/RnLjHxUtz0yIxH1YoaLtXEbe'),
(3, '202293172355161', 'Richard', 'Richard.mail@mail.com', '$2b$10$850cMdLfmFOOjpw1nnzVVuYtKyvyj2pY6AvYuNMPqNdI2dNLjWkNS'),
(4, '20229317234161570', 'user', 'user.mail@mail.com', '$2b$10$VtwcyaSzy/.xRZcp4MeXO.8XCpxSYt2glhH.qi6Oh0j8TW9WqN4oG');

