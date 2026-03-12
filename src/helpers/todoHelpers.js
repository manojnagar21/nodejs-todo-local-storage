import { localStorage } from "../storage/localStorage.js";

// Get stored todos
const getStoredTodos = () => {
    return JSON.parse(localStorage.getItem("todos") || []);
};

// Save todos
const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
}
export { getStoredTodos, saveTodos };