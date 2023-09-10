import { InferSchemaType, model, Schema } from 'mongoose';
import Joi from 'joi';

const eliteMartSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          count: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export type EliteMart = InferSchemaType<typeof eliteMartSchema>;
export default model<EliteMart>('EliteMart', eliteMartSchema);

export function validateRegister(user: {
  name: string;
  email: string;
  password: string;
}) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          '^(?=.*[!@#$%^&(),.?":{}|<>])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$'
        )
      )
      .required(),
  });

  return schema.validate(user);
}

export function validateLogin(user: { email: string; password: string }) {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          '^(?=.*[!@#$%^&(),.?":{}|<>])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$'
        )
      )
      .required(),
  });

  return schema.validate(user);
}
