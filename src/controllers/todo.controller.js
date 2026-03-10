import { ApiResponse } from "../libraries/response.js";
import { getStoredTodos, saveTodos } from "../helpers/todoHelpers.js";
import { HttpStatus } from "../constants/statusCodes.js";

// Get all todos
export const getTodos = (_req, res) => {
    try {
        // To generate fake error
        // throw new Error("Testing my error library!"); 
        // return res.status(200).send({ msg: "All todos", data: getStoredTodos });
        const response = ApiResponse.successResponse("All todos", getStoredTodos(), HttpStatus.OK);
        // console.log(response);
        return res.status(response.status).json(response);
    } catch(error) {
        console.error(error.message);
        const response = ApiResponse.errorResponse("Failed to fetch todos", error, HttpStatus.FORBIDDEN);
        return res.status(response.status).json(response);
    }
};

// Get todo by Id
export const getTodoById = (req, res) => {
    try {
        const todos = getStoredTodos();
        const { id } = req.params;
        id = Number(id);
        const todo =  todos.find(t => t.id === id);
        console.log(todo);
        res.send(todo);
    } catch(error) {
        res.send(error);
    }
};