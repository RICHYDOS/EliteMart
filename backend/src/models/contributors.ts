import {Schema, model} from "mongoose";

const contributor: Schema = new Schema({
    email: {
        type: String,
        required:[true, "Please add the contact Email Address"]
    },
}, {timestamps: true});

export const Contributor = model("Contributors", contributor);