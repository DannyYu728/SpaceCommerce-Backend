import db from "../db/connection.js";
import UserData from "../models/UserData.js";
import SpaceItem from "../models/SpaceItem.js";
// import Image from "../models/Image.js";
import users from "./users.json" assert { type: "json" };
// import images from "./images.json" assert { type: "json" };
import spaceItems from "./spaceItems.json" assert { type: "json" };

const insertData = async () => {
  await SpaceItem.deleteMany({});
  await SpaceItem.create(spaceItems);
  await UserData.deleteMany({});
  await UserData.create(users);


  db.close();
};

insertData();
