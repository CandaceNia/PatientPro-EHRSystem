CREATE DATABASE medrecords;
USE medrecords;

CREATE TABLE records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  diagnosis TEXT NOT NULL
);
