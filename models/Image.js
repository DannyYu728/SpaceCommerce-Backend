import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Image = new Schema({
  source: { type: Schema.Types.ObjectId, ref: 'userDatas' },
  spaceItem: { type: Schema.Types.ObjectId, ref: 'spaceItems'},
  image: { type: String },
});

export default mongoose.model("images", Image);
