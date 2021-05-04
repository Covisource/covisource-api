import mongoose from "mongoose";
const Schema = mongoose.Schema;

const citySchema = new Schema({
  state: {
    type: String,
    required: [true, "State is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  district: {
    type: String,
    required: false,
  },
});

citySchema.index({ city: "text" });

export default mongoose.model("City", citySchema);
