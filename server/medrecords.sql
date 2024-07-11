CREATE TABLE IF NOT EXISTS file_uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  upload_date DATE NOT NULL,
  file_path VARCHAR(255), -- Add additional fields as needed
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);
