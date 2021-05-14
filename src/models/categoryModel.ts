import mongoose from "mongoose";
const schema = mongoose.Schema;

const categorySchema = new schema({
  name: {
    type: String,
    required: [true, "Name of category is required"],
  },
});
categorySchema.index({ name: "text" });

export default mongoose.model("Category", categorySchema);
