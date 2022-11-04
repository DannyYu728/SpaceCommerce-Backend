import SpaceItem from "../models/SpaceItem.js";

export const getSpaceItems = async (req, res) => {
  try {
    const spaceItems = await SpaceItem.find();
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
    const spaceItem = new SpaceItem(req.body);
    await spaceItem.save();
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