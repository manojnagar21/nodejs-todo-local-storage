import { Router } from "express";
import {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
} from "../controllers/todo.controller.js";
const router = Router();
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);

router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);
export default router;