import { Field, ID, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Location {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column({ nullable: true })
    longitude?: string;

    @Field()
    @Column({ nullable: true })
    latitude?: string;

    @Field()
    @Column({ nullable: true })
    name?: string;

    @CreateDateColumn()
    readonly date_created: Date;

    @UpdateDateColumn()
    readonly date_updated: Date;
}
