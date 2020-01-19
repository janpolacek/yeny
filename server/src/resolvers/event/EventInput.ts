import { ArgsType, Field, InputType, Int, ObjectType } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';
import { LocationInput } from './LocationInput';
import { OrganizerInput } from './OrganizerInput';

@ArgsType()
export class MultipleEventsArgs {
    @Field(_type => Int, { nullable: true, defaultValue: 0 })
    skip?: number;

    @Field(_type => Int, { nullable: true, defaultValue: 20 })
    take?: number;
}

@ArgsType()
export class GetByDateArgs extends MultipleEventsArgs {
    @Field(_type => Date, { nullable: true })
    date?: Date;
}

@InputType()
export class CreateEventInput {
    @Field()
    @MaxLength(200)
    title: string;

    @Field()
    @MaxLength(1000)
    description: string;

    @Field(() => OrganizerInput)
    organizer: OrganizerInput;

    @Field(() => Date)
    dateFrom: Date;

    @Field(() => Date)
    dateTo: Date;

    @Field({ nullable: true })
    image?: string;

    @Field({ nullable: true })
    price?: number;

    @Field({ nullable: true })
    category?: string;

    @Field(() => LocationInput)
    location: LocationInput;

    @Field()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

@InputType()
export class DeleteIventInput {
    @Field()
    id: string;

    @Field()
    password: string;
}

@ObjectType()
export class Calendar {
    @Field(() => [String], { nullable: true })
    days?: string[];
}
