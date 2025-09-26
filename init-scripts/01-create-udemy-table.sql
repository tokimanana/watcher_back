-- Create udemy_courses table
CREATE TABLE IF NOT EXISTS udemy_courses (
    course_id BIGINT,
    course_title TEXT,
    url TEXT,
    is_paid BOOLEAN,
    price INTEGER,
    num_subscribers INTEGER,
    num_reviews INTEGER,
    num_lectures INTEGER,
    level VARCHAR(50),
    content_duration DECIMAL(10,2),
    published_timestamp TIMESTAMP,
    subject VARCHAR(100)
);

-- Import CSV data
COPY udemy_courses FROM '/data/udemy_courses.csv' 
WITH (FORMAT csv, HEADER true, DELIMITER ',', NULL '');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_udemy_subject ON udemy_courses(subject);
CREATE INDEX IF NOT EXISTS idx_udemy_level ON udemy_courses(level);
CREATE INDEX IF NOT EXISTS idx_udemy_is_paid ON udemy_courses(is_paid);

-- Display import summary
SELECT
    COUNT(*) as total_courses,
    COUNT(DISTINCT subject) as subjects,
    COUNT(CASE WHEN is_paid THEN 1 END) as paid_courses,
    COUNT(CASE WHEN NOT is_paid THEN 1 END) as free_courses
FROM udemy_courses;