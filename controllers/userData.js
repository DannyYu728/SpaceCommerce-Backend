import UserData from "../models/UserData.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserData.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};

export const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await UserData.findById(id)
      .populate("friendsList")
      .populate("favoriteRestaurants")
      .populate("image");

    if (user) {
      return res.json(user);
    }

    res.status(404).json({message: "Username not found!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};

export const getUsername = async (req, res) => {
  try {
    const user = await UserData.find({username: req.params.username})
      .populate("friendsList")
      .populate("favoriteRestaurants")
      .populate("image");

    if (user) {
      return res.json(user);
    }
    res.status(404).json({message: "Username not found!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new UserData(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};

export const updateUser = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await UserData.findByIdAndUpdate(id, req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    const deleted = await UserData.findByIdAndDelete(id);

    if (deleted) {
      return res.status(200).send("User deleted!");
    }

    throw new Error("User not found");
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};
