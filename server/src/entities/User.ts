import { Field, ID, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn, Entity, OneToMany, Column, BaseEntity } from 'typeorm';
import { Event } from './Event';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    surname: string;

    @Field()
    @Column()
    phone: string;

    @Field()
    @Column()
    email: string;

    @Field(() => [Event])
    @OneToMany(
        type => Event,
        event => event.organizer,
        { cascade: true }
    )
    events: Event[];
}
