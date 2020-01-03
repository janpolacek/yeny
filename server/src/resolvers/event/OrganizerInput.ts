import { Field, InputType } from 'type-graphql';

@InputType()
export class OrganizerInput {
    @Field()
    name: string;

    @Field()
    email: string;
}
