import { Field, ID, ObjectType } from 'type-graphql';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { Location } from './Location';
import { User } from './User';

@ObjectType()
@Entity()
export class Event {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @OneToOne(type => Location, { eager: true, cascade: true, nullable: true })
    @JoinColumn()
    location?: Location;

    @Field()
    @Column()
    date_from: Date;

    @Field()
    @Column()
    date_to: Date;

    @Field()
    @Column()
    image: string;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.events,
        { nullable: true }
    )
    organizer: User;
    @Column({ nullable: true })
    organizerId: number;

    @CreateDateColumn()
    readonly date_created: Date;

    @UpdateDateColumn()
    readonly date_updated: Date;
}
