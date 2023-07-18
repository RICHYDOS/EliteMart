import {Schema, model} from "mongoose";
import Joi from "joi";

export interface contibutorInput {
    email: string;
}

const contributor: Schema = new Schema({
    email: {
        type: String,
        required:[true, "Please add the contact Email Address"]
    },
}, {timestamps: true});

export const Contributor = model("Contributors", contributor);

export function validate(contributor: contibutorInput) {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    })

    return schema.validate(contributor);
};
