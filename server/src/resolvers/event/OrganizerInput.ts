import { Field, InputType } from 'type-graphql';

@InputType()
export class OrganizerInput {
    @Field()
    name: string;

    @Field()
    surname: string;

    @Field()
    phone: string;

    @Field()
    email: string;
}
