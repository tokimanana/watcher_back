import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('udemy_courses')
export class Course {
    @PrimaryColumn({ name: 'course_id', type: 'int' })
    courseId!: number;

    @Column({ name: 'course_title', type: 'varchar', length: 255 })
    courseTitle!: string;

    @Column({ type: 'text' })
    url!: string;

    @Column({ name: 'is_paid', type: 'boolean' })
    isPaid!: boolean;

    @Column({ type: 'float' })
    price!: number;

    @Column({ name: 'num_subscribers', type: 'int' })
    numSubscribers!: number;

    @Column({ name: 'num_reviews', type: 'int' })
    numReviews!: number;

    @Column({ name: 'num_lectures', type: 'int' })
    numLectures!: number;

    @Column({ type: 'varchar', length: 100 })
    level!: string;

    @Column({ name: 'content_duration', type: 'float' })
    contentDuration!: number;

    @Column({ name: 'published_timestamp', type: 'timestamptz' })
    publishedTimestamp!: Date;

    @Index()
    @Column({ type: 'varchar', length: 150 })
    subject!: string;
}