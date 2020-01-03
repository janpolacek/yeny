import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './Event';

@ObjectType()
@Entity()
export class Organizer extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    email: string;

    @OneToMany(
        () => Event,
        event => event.organizer
    )
    events: Event[];
}
