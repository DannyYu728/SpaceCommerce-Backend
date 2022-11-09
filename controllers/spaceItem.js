import SpaceItem from "../models/SpaceItem.js";
import User from "../models/UserData.js";
import jwt from "jsonwebtoken";

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
    const spaceItem = await SpaceItem.findById(id).populate("image").populate("owner");

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
    const spaceItem = new SpaceItem(req.body);
    spaceItem.owner = payload._id;
    await spaceItem.save();
    await User.findByIdAndUpdate(payload._id, {
      $push: {"listing": spaceItem._id}
    });
    res.status(201).json(spaceItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// NOT TESTED YET
export const buySpaceItem = async (req, res) => {
  try {
    const {id}  = req.body._id
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_KEY);
    const spaceItem = await SpaceItem.findByIdAndUpdate(id, {
      $set: {owner: payload._id}
    });
    const prevOwner = id
    await User.findByIdAndUpdate(prevOwner, {
      $pull: {"listing": spaceItem._id}
    });
    await User.findByIdAndUpdate(payload._id, {
      $push: {"listing": spaceItem._id}
    });
    res.status(201).json(spaceItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// NOT Used Yet
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

// NOT Used Yet
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
