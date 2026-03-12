import { Router } from "express";
import {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo
} from "../controllers/todo.controller.js";
const router = Router();
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);


router.patch("/:id", updateTodo);
export default router;