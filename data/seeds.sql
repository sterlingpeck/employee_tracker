INSERT INTO departments (name)
VALUES
    ('Management'),
    ('HR'),
    ('Devs Manager'),
    ('Systems/Network Administration'),
    ('Information Technology');

INSERT INTO roles (job_title, salary, dep_id)
VALUES
    ('CEO', 50000, 1),
    ('CTO', 52000, 1),
    ('HR Manager', 45000, 2),
    ('Systems Manager', 69000, 1),
    ('Networking Manager', 45000, 2),
    ('IT Manager', 42000, 2),
    ('Senior Dev', 55000, 3),
    ('Junior Dev', 40000, 3),
    ('Senior Dev', 55000, 4),
    ('Junior Dev', 40000, 4),
    ('System Administrator', 60000, 5),
    ('Network Administrator', 60000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('George', 'Grover', 1, null),
    ('Frances ', 'Callaghan', 2, 1),
    ('Christian ', 'Simon', 3, 2),
    ('Ivan', 'Hampton', 4, 2),
    ('Casper', 'Glover', 5, 4),
    ('Portia', 'Grimes', 6, 4),
    ('Joni', 'Stamp', 6, 4),
    ('Margie', 'Davis', 7, 3),
    ('Becky', 'Crossley', 8, 8),
    ('Ishaaq', 'Byrne', 8, 8),
    ('Chuck', 'Reyes', 9, 3),
    ('Anabel', 'Hutton', 10, 11),
    ('Alexis', 'Hopper', 10, 11),
    ('Randall', 'Cruz', 10, 11),
    ('Alex', 'Cohen', 11, 3),
    ('Lynn', 'Farrell', 12, 3);