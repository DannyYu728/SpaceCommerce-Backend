import { Router } from "express";
import * as controllers from "../controllers/spaceItem.js";
import restrict from "../helpers/restrict.js";
// import restrict from "../helpers/restrictArgon.js";

const router = Router();

router.get("/", controllers.getSpaceItems);
router.get("/id/:id", controllers.getSpaceItem);
router.post("/", controllers.createSpaceItem);
router.put("/id/:id", controllers.updateSpaceItem);
router.delete("/id/:id", controllers.deleteSpaceItem);

export default router;
