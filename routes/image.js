import { Router } from "express";
import * as controllers from "../controllers/image.js";

const router = Router();

router.get("/", controllers.getImages);
router.get("/id/:id", controllers.getImage);
router.post("/", controllers.createImage);
router.put("/id/:id", controllers.updateImage);
router.delete("/id/:id", controllers.deleteImage);

export default router;
