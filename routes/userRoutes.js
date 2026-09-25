import express from "express";
import {getuser,createuser,putuser,} from "../Controllers/userController.js";

const router = express.Router();

router.get("/users", getuser);

router.post("/users", createuser);

router.put("/users/:id", putuser);



export default router;