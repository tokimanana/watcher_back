import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  INSTITUTION = 'institution',
  SEARCHER = 'searcher'
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: 'user_name', nullable: false })
  userName!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ name: "password_hash", nullable: false })
  passwordHash!: string;

  @Column({ default: UserRole.STUDENT })
  role!: UserRole;

  @Column({ default: false })
  isActive!: boolean;

  @Column({ name: 'token_version', default: 0 })
  tokenVersion!: number;
}