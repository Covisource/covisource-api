// export interface userSchema {
// name: string;
// email?: string;
// provider: string;
// usesIP?: boolean;
// IP?: string;
// isBlocked?: boolean;
// reputation: number;
// removedPosts?: number;
// }

import mongoose from "mongoose";
const schema = mongoose.Schema;

const user = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: true,
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
    required: true,
  },
  removedPosts: {
    type: Number,
    required: false,
  },
});
