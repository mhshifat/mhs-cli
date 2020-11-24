import { Document, model, Schema } from "mongoose";

export interface UserDocument {
  id: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type UserModelType = UserDocument & Document;

export default model<UserModelType>("User", userSchema);
