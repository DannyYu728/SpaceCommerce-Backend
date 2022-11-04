import { Router } from "express";
import * as controllers from "../controllers/userData.js";
// import * as controllers from "../controllers/UserDataArgon.js";

const router = Router();

router.post('/signUp', controllers.signUp)
router.post('/signIn', controllers.signIn)
router.get('/verify', controllers.verify)
router.put('/changePassword/:id', controllers.changePassword)
router.get("/", controllers.getUsers);
router.get("/id/:id", controllers.getUser);
router.get('/username/:username', controllers.getUsername);
router.post("/", controllers.createUser);
router.put("/id/:id", controllers.updateUser);
router.delete("/id/:id", controllers.deleteUser);

export default router;
