import { Router } from "express";
import * as controllers from "../controllers/userData.js";

const router = Router();

router.get("/", controllers.getUsers);
router.get("/id/:id", controllers.getUser);
router.get('/username/:username', controllers.getUsername);
router.post("/", controllers.createUser);
router.put("/id/:id", controllers.updateUser);
router.delete("/id/:id", controllers.deleteUser);

export default router;
