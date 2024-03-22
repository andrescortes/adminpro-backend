import { Schema, model } from "mongoose";

const DoctorSchema = new Schema(
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
      require: true
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      require: true
    },
  },
  {
    collection: "doctors",
  }
);

DoctorSchema.methods.toJSON = function () {
  const { __v, _id, ...doctor } = this.toObject();
  doctor.uid = _id;
  return doctor;
};

const Doctor = model("Doctor", DoctorSchema);
export { Doctor };
