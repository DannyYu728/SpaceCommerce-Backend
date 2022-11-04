import mongoose from "mongoose";
const Schema = mongoose.Schema;

let SpaceItem = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: [
      "Continental",
      "Ocean",
      "Barren",
      "Tropical",
      "Desert",
      "Arid",
      "Arctic",
      "Alpine",
      "Star",
      "Station",
      "Ship",
      "Gas planet",
      "Astroid",
      "Specialty",
      "Colony",
      "Moon"
    ],
  },
  size: {
    type: String,
    required: true,
    enum: ["Tiny", "Small", "Medium", "Large", "Giant"],
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image: [{ type: Schema.Types.ObjectId, ref: "images" }],
  owner: { type: Schema.Types.ObjectId, ref: "userDatas" },
  rating: { type: Number },
  isBought: { type: Boolean },
  isHab: { type: Boolean },
});

export default mongoose.model("spaceItems", SpaceItem);
