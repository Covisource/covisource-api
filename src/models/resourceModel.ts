import mongoose from "mongoose";
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
    createdByIp: {
      type: Boolean,
      required: [true, "Mention if the resource was created from an authenticated user or not."],
    },
    Ip: {
      type: String,
      required: false,
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
    type: mongoose.Types.ObjectId,
    ref: "City",
    required: [true, "Location is required"],
  },
  price: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"],
  },
});

export default mongoose.model("Resource", resourceSchema);
