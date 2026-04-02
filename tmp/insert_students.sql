USE spbs_db;

INSERT INTO users (username, password, role, email) VALUES ('abhisri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'abhisri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC101', 'ABHISRI', 'M', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('abinaya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'abinaya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC102', 'ABINAYA', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('abishek', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'abishek@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC103', 'ABISHEK', 'KS', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('ahmedabuhurairahm', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'ahmedabuhurairahm@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC104', 'AHMED ABU HURAIRAH M', 'H', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('ajay', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'ajay@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC105', 'AJAY', 'A', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('akash', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'akash@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC106', 'AKASH', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('akshayag', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'akshayag@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC107', 'AKSHAYA G', 'J', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('aneesfathimab', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'aneesfathimab@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC108', 'ANEES FATHIMA B', 'I', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('apsaraa', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'apsaraa@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC109', 'APSARA A', 'R', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('arthi', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'arthi@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC110', 'ARTHI', 'K', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('arung', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'arung@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC111', 'ARUN G', 'R', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('arun', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'arun@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC112', 'ARUN', 'R', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('ashika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'ashika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC113', 'ASHIKA', 'A', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('ashvithathanya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'ashvithathanya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC114', 'ASHVITHA THANYA', 'K', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('ashwinkumaran', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'ashwinkumaran@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC115', 'ASHWIN KUMARAN', 'S', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('atheeqsaqlain', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'atheeqsaqlain@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC116', 'ATHEEQ SAQLAIN', 'M', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('balabavadharani', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'balabavadharani@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC117', 'BALA BAVADHARANI', 'R', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('balajik', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'balajik@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC118', 'BALAJI K', 'A', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('barathvignesh', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'barathvignesh@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC119', 'BARATH VIGNESH', 'C', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('bavankalyan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'bavankalyan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC120', 'BAVAN KALYAN', 'S', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('bharaneedhar', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'bharaneedhar@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC121', 'BHARANEEDHAR', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('bharathkumar', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'bharathkumar@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC122', 'BHARATHKUMAR', 'P', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('bosevetrivelram', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'bosevetrivelram@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC123', 'BOSEVETRIVELRAM', 'M', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('celsiajuvanitta', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'celsiajuvanitta@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC124', 'CELSIA JUVANITTA', 'J', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('darsanit', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'darsanit@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC125', 'DARSANI T', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('deepika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'deepika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC126', 'DEEPIKA', 'R', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('dhanushri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'dhanushri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC127', 'DHANU SHRI', 'V', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('dhanusrikr', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'dhanusrikr@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC128', 'DHANUSRI K R', 'R', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('dhanusri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'dhanusri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC129', 'DHANUSRI', 'T', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('dharanishs', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'dharanishs@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC130', 'DHARANISH S', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('dharsana', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'dharsana@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC131', 'DHARSAN A', 'K', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('dharshini', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'dharshini@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC132', 'DHARSHINI', 'M', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('dibagar', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'dibagar@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC133', 'DIBAGAR', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('dinesh', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'dinesh@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC134', 'DINESH', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('divya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'divya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC135', 'DIVYA', 'S', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('durkaibalan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'durkaibalan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC136', 'DURKAIBALAN', 'P', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('elakkiya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'elakkiya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC137', 'ELAKKIYA', 'R', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('elakkiyasri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'elakkiyasri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC138', 'ELAKKIYASRI', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('ganga', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'ganga@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC139', 'GANGA', 'T', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('giridharan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'giridharan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC140', 'GIRIDHARAN', 'M', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('girija', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'girija@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC141', 'GIRIJA', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('gokulprasath', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'gokulprasath@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC142', 'GOKUL PRASATH', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('gopikasri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'gopikasri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC143', 'GOPIKA SRI', 'E', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('gowri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'gowri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC144', 'GOWRI', 'N', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('hariharanp', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'hariharanp@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC145', 'HARIHARAN P', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('haripreethis', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'haripreethis@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC146', 'HARIPREETHI S', 'M', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('harirambharathan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'harirambharathan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC147', 'HARIRAM BHARATHAN', 'M', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('harishkarthicj', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'harishkarthicj@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC148', 'HARISH KARTHIC J', 'K', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('harishkumar', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'harishkumar@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC149', 'HARISH KUMAR', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('harishmitha', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'harishmitha@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC150', 'HARISHMITHA', 'R', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('harisuryaprakash', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'harisuryaprakash@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC151', 'HARISURYAPRAKASH', 'O', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('harshini', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'harshini@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC152', 'HARSHINI', 'S', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('harsini', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'harsini@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC153', 'HARSINI', 'R', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('hemapriya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'hemapriya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC154', 'HEMA PRIYA', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('hemapriya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'hemapriya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC155', 'HEMAPRIYA', 'S', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('indhu', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'indhu@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC156', 'INDHU', 'S', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('jaidevm', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'jaidevm@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC157', 'JAIDEV M', 'C', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('janakiri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'janakiri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC158', 'JANA KIRI', 'G', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('janemystika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'janemystika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC159', 'JANE MYSTIKA', 'D', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('jayaprabhagokul', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'jayaprabhagokul@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC160', 'JAYAPRABHA GOKUL', 'KUMAR', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('jayaswaroopas', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'jayaswaroopas@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC161', 'JAYASWAROOPA S', 'M', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('jefferysantoj', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'jefferysantoj@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC162', 'JEFFERY SANTO J', 'A', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('jeyaprasanna', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'jeyaprasanna@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC163', 'JEYA PRASANNA', 'S', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('joshika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'joshika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC164', 'JOSHIKA', 'M', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('jothika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'jothika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC165', 'JOTHIKA', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('kabil', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kabil@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC166', 'KABIL', 'M', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('kabilan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kabilan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC167', 'KABILAN', 'D', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('kabilan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kabilan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC168', 'KABILAN', 'N', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('kabilan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kabilan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC169', 'KABILAN', 'R', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('kamalikasthuri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kamalikasthuri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC170', 'KAMALI KASTHURI', 'K', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('kamalnath', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kamalnath@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC171', 'KAMALNATH', 'V', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('kamesh', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kamesh@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC172', 'KAMESH', 'S', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('kanishka', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kanishka@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC173', 'KANISHKA', 'M', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('karthika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'karthika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC174', 'KARTHIKA', 'R', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('karthikeyan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'karthikeyan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC175', 'KARTHIKEYAN', 'K', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('kathirv', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kathirv@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC176', 'KATHIR V', 'B', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('kavin', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kavin@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC177', 'KAVIN', 'R', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('kavin', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kavin@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC178', 'KAVIN', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('kaviya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kaviya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC179', 'KAVIYA', 'S', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('kavya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kavya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC180', 'KAVYA', 'C', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('keerthivasan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'keerthivasan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC181', 'KEERTHIVASAN', 'J', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('keerthivasan', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'keerthivasan@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC182', 'KEERTHIVASAN', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('kharizma', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kharizma@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC183', 'KHARIZMA', 'A', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('kousika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kousika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC184', 'KOUSIK A', 'B', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('kowsic', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kowsic@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC185', 'KOWSIC', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('kowsika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'kowsika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC186', 'KOWSIKA', 'D', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('lalithkumar', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'lalithkumar@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC187', 'LALITHKUMAR', 'R', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('leahagalya', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'leahagalya@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC188', 'LEAH AGALYA', 'RAJ', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('lingeshg', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'lingeshg@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC189', 'LINGESH G', 'R', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('lohith', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'lohith@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC190', 'LOHITH', 'R', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('luckshana', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'luckshana@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC191', 'LUCKSHANA', 'VR', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('madhankumar', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'madhankumar@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC192', 'MADHANKUMAR', 'E', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('madhubala', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'madhubala@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC193', 'MADHUBALA', 'N', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('madhumitha', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'madhumitha@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC194', 'MADHUMITHA', 'N', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('madhumitha', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'madhumitha@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC195', 'MADHUMITHA', 'S', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('malliharjun', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'malliharjun@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC196', 'MALLIHARJUN', 'M', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('manimegalai', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'manimegalai@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC197', 'MANIMEGALAI', 'M', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('manisha', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'manisha@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC198', 'MANISHA', 'D', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('manoj', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'manoj@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC199', 'MANOJ', 'J', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('manoj', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'manoj@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC200', 'MANOJ', 'R', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('manojkumarc', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'manojkumarc@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC201', 'MANOJKUMAR C', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('marish', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'marish@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC202', 'MARISH', 'M', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('midunthanigachalam', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'midunthanigachalam@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC203', 'MIDUN THANIGACHALAM', 'SUBBARAYAN', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('mithunb', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'mithunb@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC204', 'MITHUN B', 'S', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('mohamedismail', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'mohamedismail@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC205', 'MOHAMED ISMAIL', 'T', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('mohammadabdullah', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'mohammadabdullah@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC206', 'MOHAMMAD ABDULLAH', 'S', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('mohammedhanifa', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'mohammedhanifa@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC207', 'MOHAMMED HANIFA', 'M', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('mohammedhussain', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'mohammedhussain@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC208', 'MOHAMMED HUSSAIN', 'F', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('mohitbalaji', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'mohitbalaji@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC209', 'MOHIT BALAJI', 'M', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('monika', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'monika@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC210', 'MONIKA', 'M', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('monikasri', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'monikasri@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC211', 'MONIKA SRI', 'K', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('monish', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'monish@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC212', 'MONISH', 'R', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('mugeshkannas', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'mugeshkannas@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC213', 'MUGESHKANNA S', 'R', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('nandha', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'nandha@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC214', 'NANDHA', 'VISVANATHAN', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('nanthana', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'nanthana@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC215', 'NANTHANA', 'C', 'AL', 4);

INSERT INTO users (username, password, role, email) VALUES ('narbavi', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'narbavi@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC216', 'NARBAVI', 'T', 'EE', 4);

INSERT INTO users (username, password, role, email) VALUES ('naresh', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'naresh@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC217', 'NARESH', 'S', 'AD', 4);

INSERT INTO users (username, password, role, email) VALUES ('naveenkumar', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'naveenkumar@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC218', 'NAVEEN KUMAR', 'I', 'EC', 4);

INSERT INTO users (username, password, role, email) VALUES ('naveenkumark', '$2b$10$2B4oV2W6O4m3Z6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h', 'student', 'naveenkumark@spbs.com');
SET @last_user_id = LAST_INSERT_ID();
INSERT INTO students (user_id, roll_number, first_name, last_name, department, semester) VALUES (@last_user_id, 'EC219', 'NAVEEN KUMAR K', 'V', 'AL', 4);

