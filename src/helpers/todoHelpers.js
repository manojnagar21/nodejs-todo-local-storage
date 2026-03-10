import { localStorage } from "../storage/localStorage.js";

// get stored todos
const getStoredTodos = () => {
    return JSON.parse(localStorage.getItem("todos") || []);
};

// save todos
const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
}
export { getStoredTodos, saveTodos };