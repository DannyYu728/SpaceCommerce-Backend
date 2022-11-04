import argon2 from 'argon2'
import { V4 } from 'paseto'
import { createPrivateKey } from 'crypto'

import UserData from "../models/UserData.js";

// for development purposes
let key = 'superdupergoodkey'

// for production
if (process.env.NODE_ENV === 'production') {
  const key = createPrivateKey(privateKey)
}

export const getUsers = async (req, res) => {
  try {
    const users = await UserData.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const password_digest = await argon2.hash(password)
    const user = new UserData({
      name,
      email,
      password_digest,
    })

    await user.save()

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000),
    }

    const token = V4.sign(payload, key, {
      expiresIn: '2 hours'
    })
    res.status(201).json({ token })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message })
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserData.findOne({ email: email }).select(
      'name email password_digest'
    )
    if (await argon2.verify(user.password_digest, password )) {
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
      }

      const token = V4.sign(payload, key, {
        expiresIn: '2 hours'
      })
      res.status(201).json({ token })
    } else {
      res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = V4.verify(token, key)
    if (payload) {
      res.json(payload)
    }
  } catch (error) {
    console.log(error.message)
    res.status(401).send('Not Authorized')
  }
}

export const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await UserData.findById(id)
      .populate("listing")
      .populate("favoriteItems")
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
      .populate("listing")
      .populate("favoriteItems")
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
