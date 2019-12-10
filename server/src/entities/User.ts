import { Field, ID, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn, Entity, OneToMany, Column } from 'typeorm';
import { Event } from './Event';

@ObjectType()
@Entity()
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    surname: string;

    @Field(type => [Event])
    @OneToMany(
        type => Event,
        event => event.organizer,
        { cascade: true }
    )
    events: Event[];
}
