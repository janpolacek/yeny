import { Field, InputType } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';
import { LocationInput } from './LocationInput';
import { OrganizerInput } from './OrganizerInput';

@InputType()
export class CreateEventInput {
    @Field()
    @MaxLength(200)
    title: string;

    @Field()
    @MaxLength(1000)
    description: string;

    @Field(() => LocationInput, { nullable: true })
    location: LocationInput;

    @Field(() => OrganizerInput)
    organizer: OrganizerInput;

    @Field()
    date_from: Date;

    @Field()
    date_to: Date;

    @Field()
    image: string;

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
