import { Field, ID, ObjectType, Root } from 'type-graphql';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    BaseEntity
} from 'typeorm';
import { Location } from './Location';
import { User } from './User';

@ObjectType()
@Entity()
export class Event extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field(() => Location, { nullable: true })
    @OneToOne(() => Location, { eager: true, cascade: true, nullable: true })
    @JoinColumn()
    location?: Location;

    @Field()
    @Column()
    dateFrom: Date;

    @Field()
    @Column()
    dateTo: Date;

    @Field()
    @Column()
    image: string;

    @Column()
    password: string;

    @Field(() => User)
    @ManyToOne(
        () => User,
        user => user.events,
        { eager: true, cascade: true }
    )
    organizer: User;

    @CreateDateColumn()
    readonly date_created: Date;

    @UpdateDateColumn()
    readonly date_updated: Date;
}
