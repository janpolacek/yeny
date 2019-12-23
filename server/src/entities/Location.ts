import { Field, ID, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    longitude?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    latitude?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    name?: string;

    @CreateDateColumn()
    readonly dateCreated: Date;

    @UpdateDateColumn()
    readonly dateUpdated: Date;
}
