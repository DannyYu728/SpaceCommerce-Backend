import mongoose from "mongoose";
const Schema = mongoose.Schema;

let UserData = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password_digest: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    rating: { type: Number },
    favoriteItems: [{ type: Schema.Types.ObjectId, ref: "spaceItems" }],
    listing: [{ type: Schema.Types.ObjectId, ref: "spaceItems" }],
  },
  { timestamps: true }
);

export default mongoose.model("userDatas", UserData);
