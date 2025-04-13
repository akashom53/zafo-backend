import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { User } from "src/users/entities/user.entity";

@Schema()
export class Event {

    @Prop({ required: true })
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