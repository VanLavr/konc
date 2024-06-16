-- Create professors table
CREATE TABLE professors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    num_students INT
);

-- Create students1 table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    professor_id INT,
    specialization TEXT,
    graduation_year YEAR,
    FOREIGN KEY (professor_id) REFERENCES professors(id)
);

-- Create students2 table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    professor_id INT,
    specialization TEXT,
    graduation_year YEAR
);

-- Insert data into professors table
INSERT INTO professors (name, num_students) VALUES
('Dr. Smith', 20),
('Prof. Johnson', 15),
('Dr. Lee', 18),
('Prof. Williams', 22),
('Dr. Brown', 25);

-- Insert data into students table
INSERT INTO students (name, professor_id, specialization, graduation_year) VALUES
('John Doe', 1, 'Computer Science', 2023),
('Alice Johnson', 2, 'Mathematics', 2024),
('Emily Smith', 3, 'Physics', 2025),
('Michael Williams', 4, 'Biology', 2023),
('Sophia Lee', 5, 'Chemistry', 2024);

-- Drop tables
DROP TABLE students;
DROP TABLE professors;