import { Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/", (req, res) => {
    res.send("all users");
});

router.post("/", (req, res) => {
    res.send("all users");
});

export { router };
