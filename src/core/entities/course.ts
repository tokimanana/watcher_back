import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

const numericToNumber = {
    to: (value?: number | null) => value,
    from: (value?: string | null) => (value === null || value === undefined ? null : Number(value)),
};

@Entity({ name: 'udemy_courses' })
export class Course {
    @PrimaryColumn({ name: 'course_id', type: 'bigint' })
    courseId!: number;

    @Column({ name: 'course_title', type: 'text' })
    courseTitle!: string;

    @Column({ type: 'text' })
    url!: string;

    @Column({ name: 'is_paid', type: 'boolean' })
    isPaid!: boolean;

    @Column({ type: 'integer' })
    price!: number;

    @Column({ name: 'num_subscribers', type: 'integer' })
    numSubscribers!: number;

    @Column({ name: 'num_reviews', type: 'integer' })
    numReviews!: number;

    @Column({ name: 'num_lectures', type: 'integer' })
    numLectures!: number;

    @Column({ type: 'varchar', length: 150 })
    level!: string;

    @Column({
        name: 'content_duration',
        type: 'numeric',
        precision: 10,
        scale: 2,
        transformer: numericToNumber,
    })
    contentDuration!: number;

    @Column({ name: 'published_timestamp', type: 'timestamptz' })
    publishedTimestamp?: Date;

}