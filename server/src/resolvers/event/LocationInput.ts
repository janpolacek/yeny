import { Field, InputType } from 'type-graphql';

@InputType()
export class LocationInput {
    @Field()
    longitude?: string;

    @Field()
    latitude?: string;

    @Field()
    name?: string;
}
