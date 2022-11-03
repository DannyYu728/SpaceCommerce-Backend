import Image from "../models/Image.js";

export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id)
      .populate("source")
      .populate("restaurant");

    if (image) {
      return res.json(image);
    }

    res.status(404).json({ message: "Image not found!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createImage = async (req, res) => {
  try {
    const image = new Image(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndUpdate(id, req.body);
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Image.findByIdAndDelete(id);

    if (deleted) {
      return res.status(200).send("Image deleted!");
    }

    throw new Error("Image not found");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
