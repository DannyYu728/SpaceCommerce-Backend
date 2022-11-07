import SpaceItem from "../models/SpaceItem.js";
import User from "../models/UserData.js";
import jwt from 'jsonwebtoken'

export const getSpaceItems = async (req, res) => {
  try {
    const spaceItems = await SpaceItem.find().populate("image");
    res.json(spaceItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getSpaceItem = async (req, res) => {
  try {
    const { id } = req.params;
    const spaceItem = await SpaceItem.findById(id).populate("image");

    if (spaceItem) {
      return res.json(spaceItem);
    }

    res.status(404).json({ message: "spaceItem not found!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createSpaceItem = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    
    const user = User.findById(payload._id);
    console.log("user id: ", user._id)
    const spaceItem = new SpaceItem(req.body);
    spaceItem.owner = user._id;
    await spaceItem.save();
    console.log(user.listing)
    user.listing.push(spaceItem);
    await user.save();
    res.status(201).json(spaceItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateSpaceItem = async (req, res) => {
  try {
    const { id } = req.params;
    const spaceItem = await SpaceItem.findByIdAndUpdate(id, req.body);
    res.status(201).json(spaceItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteSpaceItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SpaceItem.findByIdAndDelete(id);

    if (deleted) {
      return res.status(200).send("spaceItem deleted!");
    }

    throw new Error("spaceItem not found");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
