# MySpace-Backend

# Description
This API allows user to retrieve infomration of celestital items. A separate database is assigned for images, items, and users. 

# Prerequisites
express, mongoose, bcrypt, chalk, cors, morgan, argon2, paseto. 
Authentication successful by jsonweboken. 
Salt Hash Password successful by vcrib. 

## Data Schema

User:

```
let UserData = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password_digest: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    rating: { type: Number },
    favoriteItems: [{ type: Schema.Types.ObjectId, ref: "spaceItems" }],
    listing: [{ type: Schema.Types.ObjectId, ref: "spaceItems" }],
  },
  { timestamps: true }
);

```

SpaceItem:

```
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
      "GasPlanet",
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

```
Image:

```
let Image = new Schema({
  source: { type: Schema.Types.ObjectId, ref: 'userDatas' },
  spaceItem: { type: Schema.Types.ObjectId, ref: 'spaceItems'},
  image: { type: String },
});

```

# Getting Started
Fork and clone this repository and Change into the new directory. Open a terminal and run node index.js

# Authors
Danny Yu, Kyle Anthony, Connor Harris, Jacob Csonka, Andrea Alonso 

# How to use
On your web browser, go to https://spacecommerce.up.railway.app/ to view the home page and available endpoints. To view different items, type in https://spacecommerce.up.railway.app/spaceItems 

# License
This project is licensed under the GNU General Public License v3.0.

# Acknowledgements
API CREDIT: Danny Yu and Connor Harris
