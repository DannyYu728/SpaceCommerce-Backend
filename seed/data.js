import db from "../db/connection.js";
import UserData from "../models/UserData.js";
import Restaurant from "../models/Restaurant.js";
import Image from "../models/Image.js";
import users from "./users.json" assert { type: "json" };
import images from "./images.json" assert { type: "json" };
import restaurants from "./restaurants.json" assert { type: "json" };

const insertData = async () => {
  await UserData.deleteMany({});
  await Restaurant.deleteMany({});
  await Image.deleteMany({});
  await UserData.create(users);
  await Restaurant.create(restaurants);
  await Image.create(images);

  db.close();
};

insertData();
