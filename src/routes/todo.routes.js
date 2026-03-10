import { Router } from "express";
import {
    getTodos,
    getTodoById,
} from "../controllers/todo.controller.js";
const router = Router();
router.get("/", getTodos);
router.get("/:id", getTodoById);
export default router;