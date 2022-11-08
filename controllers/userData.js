import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserData from "../models/UserData.js";

let SALT_ROUNDS = 12
let TOKEN_KEY = 'devkeyisnotthatgreat'

if (process.env.NODE_ENV === 'production') {
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
  TOKEN_KEY = process.env.TOKEN_KEY
}

const today = new Date()
const exp = new Date(today)
exp.setDate(today.getDate() + 30)

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
    const { username, email, password } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = new UserData({
      username,
      email,
      password_digest,
    })

    await user.save()

    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000),
    }

    const token = jwt.sign(payload, TOKEN_KEY)
    res.status(201).json({ token })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message })
  }
}

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await UserData.findOne({ username: username }).select(
      'username email password_digest'
    )
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
      }

      const token = jwt.sign(payload, TOKEN_KEY)
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
    const payload = jwt.verify(token, TOKEN_KEY)
    if (payload) {
      res.json(payload)
    }
  } catch (error) {
    console.log(error.message)
    res.status(401).send('Not Authorized')
  }
}

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params

    const { password, newPassword, username } = req.body
    // const user = UserData.findById(id).select(
    //   'username email password_digest'
    // )
    const user = await UserData.findOne({ username: username }).select(
      'username email password_digest'
    )

    if (await bcrypt.compare(password, user.password_digest)) {
      user.password_digest = await bcrypt.hash(newPassword, SALT_ROUNDS)
      user.save()
      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
      }

      const token = jwt.sign(payload, TOKEN_KEY)
      res.status(201).json({ token })
    } else {
      res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await UserData.findById(id).populate("listing");
    if (user) {
      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        listing: user.listing,
        exp: parseInt(exp.getTime() / 1000),
      }

      const token = jwt.sign(payload, TOKEN_KEY)
      res.status(201).json({ token })
    }
    res.status(404).json({ message: 'Username not found!' })
    // res.status(201).json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

export const getUsername = async (req, res) => {
  try {
    const user = await UserData.find({username: req.params.username})
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
    const user = await UserData.findByIdAndUpdate(id, req.body, { new: true });
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
