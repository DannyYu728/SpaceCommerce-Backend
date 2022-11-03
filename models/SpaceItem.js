import mongoose from "mongoose";
const Schema = mongoose.Schema;

let SpaceItem = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  location: { type: String, required: true },
  image: [{ type: Schema.Types.ObjectId, ref: "images" }],
  rating: { type: Number },
  isBrought: { type: Boolean },
  isHab: { type: Boolean }
});

export default mongoose.model("spaceItems", SpaceItem);
