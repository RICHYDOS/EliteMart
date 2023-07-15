import {Schema, model} from "mongoose";

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