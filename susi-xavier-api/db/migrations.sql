CREATE TABLE USERS (
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(100) NOT NULL,
	LAST_NAME VARCHAR(100),
	EMAIL VARCHAR(100) UNIQUE NOT NULL,
	PASSWORD TEXT NOT NULL,
	DATE_BIRTH DATE,
	PHONE_NUMBER VARCHAR(25),
	ROLE varchar(10)[],
	PROFILE_IMAGE TEXT
);

CREATE TABLE BLOG_MESSAGES (
	ID_MESSAGE SERIAL PRIMARY KEY,
	MESSAGE TEXT DEFAULT '' NOT NULL,
	ID_USER INTEGER NOT NULL,
	FOREIGN KEY (ID_USER) REFERENCES USERS (ID)
);