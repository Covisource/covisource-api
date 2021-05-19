import mongoose from "mongoose";
const schema = mongoose.Schema;

const categorySchema = new schema({
  name: {
    type: String,
    required: [true, "Name of category is required"],
  },
  extraParameters: [
    {
      name: {
        type: String,
        required: [true, "Name of the paramater is required"],
      },
      icon: {
        type: String,
        required: [true, "Icon of the paramater is required"],
      },
      type: {
        type: String,
        required: [
          true,
          "Type of the paramater is required (e.g Text, Tel, Email, Text Area)",
        ],
      },
    },
  ],
});
categorySchema.index({ name: "text" });

export default mongoose.model("Category", categorySchema);
