import { Router } from "express";
import userRoutes from "./userData.js";
import spaceItemRoutes from "./spaceItem.js";
import imageRoutes from "./image.js";


const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/users", userRoutes);
router.use("/spaceItems", spaceItemRoutes);
router.use("/images", imageRoutes);

export default router;
