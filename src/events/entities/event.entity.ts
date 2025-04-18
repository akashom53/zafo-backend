import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Event {

    //TODO: Setup one to many relation with user such that every event has a pointer to the user which created it.
    //user: User

    @Prop({ required: true })
    createdAt: Date


    @Prop({ required: true })
    tag: string


    @Prop({ required: false })
    group: string

    @Prop({ required: false, type: Map })
    metaData: Object

}


export const EventSchema = SchemaFactory.createForClass(Event)