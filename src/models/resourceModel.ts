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
    type: mongoose.Types.ObjectId,
    required: [true, "Creator is required"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: [true, "Category is required"],
  },
  location: {
    state: {
      type: String,
      required: [true, "Location->State is required"],
    },
    city: {
      type: String,
      required: [true, "Location->City is required"],
    },
    subCity: {
      type: String,
      required: false,
    },
  },
});

export default mongoose.model("Resource", resourceSchema);
