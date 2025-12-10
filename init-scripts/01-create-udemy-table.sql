\echo 'Ensuring udemy_courses table exists'

CREATE TABLE IF NOT EXISTS public.udemy_courses (
    course_id           BIGINT PRIMARY KEY,
    course_title        TEXT        NOT NULL,
    url                 TEXT        NOT NULL,
    is_paid             BOOLEAN     NOT NULL,
    price               INTEGER     NOT NULL,
    num_subscribers     INTEGER     NOT NULL,
    num_reviews         INTEGER     NOT NULL,
    num_lectures        INTEGER     NOT NULL,
    level               VARCHAR(150) NOT NULL,
    content_duration    NUMERIC(10, 2) NOT NULL,
    published_timestamp TIMESTAMPTZ NOT NULL,
    subject             TEXT
);

-- Check if table has data
SELECT CASE WHEN EXISTS (SELECT 1 FROM public.udemy_courses LIMIT 1) THEN 1 ELSE 0 END AS has_data \gset

\if :has_data
    \echo 'udemy_courses already populated. Skipping seed.'
\else
    \echo 'Seeding udemy_courses from /data/udemy_courses.csv'

    -- Import CSV data directly
    COPY public.udemy_courses (
        course_id,
        course_title,
        url,
        is_paid,
        price,
        num_subscribers,
        num_reviews,
        num_lectures,
        level,
        content_duration,
        published_timestamp,
        subject
    )
    FROM '/data/udemy_courses.csv'
    WITH (
        FORMAT csv,
        HEADER true,
        DELIMITER ',',
        QUOTE '"',
        ESCAPE '"',
        NULL ''
    );

    \echo 'Seeding completed. Rows imported:'
    SELECT COUNT(*) FROM public.udemy_courses;
\endif