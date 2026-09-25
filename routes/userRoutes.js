import express from "express";
import {getuser,createuser,putuser,} from "../Controllers/userController.js";

const router = express.Router();

router.get("/", getuser);

router.post("/", createuser);

router.put("/:id", putuser);



export default router;