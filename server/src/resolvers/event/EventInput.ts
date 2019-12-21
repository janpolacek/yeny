import { Field, InputType } from 'type-graphql';
import { MaxLength } from 'class-validator';
import { LocationInput } from './LocationInput';

@InputType()
export class EventInput {
    @Field()
    @MaxLength(200)
    title: string;

    @Field()
    @MaxLength(1000)
    description: string;

    @Field(() => LocationInput, { nullable: true })
    location: LocationInput;

    @Field()
    date_from: Date;

    @Field()
    date_to: Date;

    @Field()
    image: string;
}
