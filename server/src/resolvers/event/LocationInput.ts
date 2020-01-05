import { Field, InputType } from 'type-graphql';

@InputType()
export class LocationInput {
    @Field({ nullable: true })
    longitude?: string;

    @Field({ nullable: true })
    latitude?: string;

    @Field()
    name: string;
}
