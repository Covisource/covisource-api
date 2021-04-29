import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: [true, "Social Provider is required"],
  },
  usesIP: {
    type: Boolean,
    required: false,
  },
  IP: {
    type: String,
    required: false,
  },
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
});

export default mongoose.model("User", userSchema);
