import mongoose from "mongoose";
import pointSchema from "./pointSchema";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: [true, "Custom ID is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  resources: [
    {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "Resource",
        required: [true, "Resource Id is required"],
      },
    },
  ],
  isBlocked: {
    type: Boolean,
    required: false,
  },
  reputation: {
    type: String,
    required: [true, "Reputation is required"],
  },
  removedPosts: {
    type: Number,
    required: false,
  },
  location: {
    type: pointSchema,
    required: false,
  },
});

export default mongoose.model("User", userSchema);
