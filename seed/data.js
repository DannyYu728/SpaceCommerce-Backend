import db from "../db/connection.js";
import UserData from "../models/UserData.js";
import SpaceItem from "../models/SpaceItem.js";
import Image from "../models/Image.js";
import users from "./users.json" assert { type: "json" };
import images from "./images.json" assert { type: "json" };
import spaceItems from "./spaceItems.json" assert { type: "json" };

const insertData = async () => {
  await UserData.deleteMany({});
  await SpaceItem.deleteMany({});
  await Image.deleteMany({});
  await UserData.create(users);
  await SpaceItem.create(spaceItems);
  await Image.create(images);

  db.close();
};

insertData();
