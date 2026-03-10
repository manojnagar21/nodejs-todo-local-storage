import { LocalStorage } from "node-localstorage";
// Initialize local storage
// Create storage folder
export const localStorage = new LocalStorage('./storage');
// Set default todo if not exists
if(!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
}