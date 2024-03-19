import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [ true, "Name is required" ],
  },
  email: {
    type: String,
    unique: true,
    required: [ true, "Email is required" ],
  },
  password: {
    type: String,
    required: [ true, "Password is required" ],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  status: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

const User = model("User", UserSchema);
export { User };
