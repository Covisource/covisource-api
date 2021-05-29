import mongoose from "mongoose";
import locationSchema from "./locationSchema";
const schema = mongoose.Schema;

const resourceSchema = new schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: false,
  },
  creator: {
    Ip: {
      type: String,
      required: false,
      select: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  location: {
    type: locationSchema,
    required: [true, "Location of resource is required"],
  },
  price: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  extraParameters: [
    {
      name: {
        type: String,
        required: [true, "Name of the extra parameter is required"],
      },
      value: {
        type: schema.Types.Mixed,
        required: false,
      },
    },
  ],
});

resourceSchema.index({ location: "2dsphere" });

export default mongoose.model("Resource", resourceSchema);
