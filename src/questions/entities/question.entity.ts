import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/entities/user.entity";

@Schema()
export class Question {

    @Prop({ required: true })
    cardId: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true })
    question: string;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: User
}

export const QuestionSchema = SchemaFactory.createForClass(Question)