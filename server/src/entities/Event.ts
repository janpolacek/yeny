import { Field, ID, ObjectType } from 'type-graphql';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Location } from './Location';

@ObjectType()
@Entity()
export class Event {
    @Field(_type => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @OneToOne(_type => Location, { eager: true, cascade: true, nullable: true })
    @JoinColumn()
    location?: Location;

    @Field()
    @Column()
    date_from: Date;

    @Field()
    @Column()
    date_to: Date;

    @CreateDateColumn()
    readonly date_created: Date;

    @UpdateDateColumn()
    readonly date_updated: Date;
}
