import {Schema, model} from "mongoose";
import Joi from "joi";

export interface volunteerInput {
    email: string;
    password: string;
}

const volunteer: Schema = new Schema({
    email: {
        type: String,
        required:[true, "Please add the contact Email Address"]
    },
    password: {
        type: String,
        required: [true, "Please Enter the Password"]
    }
}, {timestamps: true});

export const Volunteer = model("Volunteers", volunteer);

export function validate(volunteer: volunteerInput) {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp ('^(?=.*[!@#$%^&(),.?":{}|<>])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$')).required()
    })

    return schema.validate(volunteer);
};
