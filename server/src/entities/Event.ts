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
import { Organizer } from './Organizer';

@ObjectType()
@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    url: string;

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

    @Field({ nullable: true })
    @Column({ nullable: true })
    price: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    category: string;

    @Field(() => Organizer)
    @ManyToOne(
        () => Organizer,
        organizer => organizer.events,
        { eager: true, cascade: true }
    )
    organizer: Organizer;
    @Column()
    organizerId: number;

    @CreateDateColumn()
    readonly dateCreated: Date;

    @UpdateDateColumn()
    readonly dateUpdated: Date;
}
