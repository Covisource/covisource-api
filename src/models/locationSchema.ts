import mongoose from "mongoose";
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  displayName: {
    type: String,
    required: [true, "Location Display Name Is Required"],
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export default locationSchema;
