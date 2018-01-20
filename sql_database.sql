-- Database is hosted on elephantsql.com - info saved here for own reference
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	email varchar NOT NULL,
	password varchar NOT NULL
);

CREATE TABLE projects (
	project_id SERIAL PRIMARY KEY,
	project_name varchar NOT NULL
);

CREATE TABLE tasks (
	task_id SERIAL PRIMARY KEY,
	summary varchar NOT NULL,
	description varchar NOT NULL,
	due_date DATE NOT NULL,
	priority INT NOT NULL,
	project_id INT NOT NULL
);

ALTER TABLE tasks ADD CONSTRAINT tasks_fk0 FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE;

-- original insertions
-- insert into users (first_name, last_name, email, password)
-- values ('Ada', 'Lovelace', 'ada@gmail.com', 'password');

-- insert into projects (project_name)
-- values ('make a cosplay!');

-- insert into tasks (summary, description, due_date, priority, project_id)
-- values ('Pick a character', 'Find a character, and explain why you would love to cosplay them', '2018-02-15', 5, 4);