import { ArgsType, Field, InputType, Int } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';
import { LocationInput } from './LocationInput';
import { OrganizerInput } from './OrganizerInput';

@ArgsType()
export class GetEventsArgs {
    @Field(_type => Int, { nullable: true, defaultValue: 0 })
    skip?: number;

    @Field(_type => Int, { nullable: true, defaultValue: 20 })
    take?: number;
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

    @Field()
    dateFrom: Date;

    @Field()
    dateTo: Date;

    @Field()
    image: string;

    @Field({ nullable: true })
    price: number;

    @Field({ nullable: true })
    category: string;

    @Field(() => LocationInput, { nullable: true })
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
