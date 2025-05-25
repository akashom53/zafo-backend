import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/entities/user.entity";


@Schema()
export class Event {

    //TODO: Setup one to many relation with user such that every event has a pointer to the user which created it.
    //user: User

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: User

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