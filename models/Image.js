import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Image = new Schema({
  name: { type: String },
  image: { type: String },
});

export default mongoose.model("images", Image);
