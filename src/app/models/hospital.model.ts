import { Schema, model } from "mongoose";

const HospitalSchema = new Schema(
  {
    name: {
      type: String,
      required: [ true, "Name is required" ],
    },
    img: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "hospitals",
  }
);

HospitalSchema.methods.toJSON = function () {
  const { __v, _id, ...hospital } = this.toObject();
  hospital.uid = _id;
  return hospital;
};

const Hospital = model("Hospital", HospitalSchema);
export { Hospital };
