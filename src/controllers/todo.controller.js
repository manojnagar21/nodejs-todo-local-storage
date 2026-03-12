import { ApiResponse } from "../libraries/response.js";
import { getStoredTodos, saveTodos } from "../helpers/todoHelpers.js";
import { HttpStatus } from "../constants/statusCodes.js";

// Get all todos
export const getTodos = (_req, res) => {
    try {
        // To generate fake error
        // throw new Error("Testing my error library!"); 
        const response = ApiResponse.successResponse("All todos", getStoredTodos(), HttpStatus.OK);
        return res.status(response.status).json(response);
    } catch(error) {
        const response = ApiResponse.errorResponse("Failed to fetch todos", error, HttpStatus.FORBIDDEN);
        return res.status(response.status).json(response);
    }
};

// Get todo by Id
export const getTodoById = (req, res) => {
    try {
        // To generate fake error
        // throw new Error("Testing my error library!");
        const todos = getStoredTodos();
        const id = Number(req.params.id);
        const todo =  todos.find(t => t.id === id);
        console.log(!todo);
        if(!todo) {
            console.log("inside if");
            const response = ApiResponse.errorResponse("Todo doesn't exists", error, HttpStatus.OK);
            // console.log(response);
            return res.status(response.status).json(response);
        }
        const response = ApiResponse.successResponse("Todo by id", getStoredTodos()[0], HttpStatus.OK);
        return res.status(response.status).json(response);
    } catch(error) {
        // res.send(error);
        const response = ApiResponse.errorResponse("Failed to fetch todo by Id", error, HttpStatus.FORBIDDEN);
        return res.status(response.status).json(response);
    }
};



// Create todo
export const createTodo = (req, res) => {
    try {
        const todos = getStoredTodos();
        const newTodo = {
            id: Date.now(),
            title: req.body.title,
            completed: false,
            createdAt: Date.now(),
            updatedAt: null
        };
        todos.push(newTodo);
        saveTodos(todos);
        const response = ApiResponse.successResponse("Todo create succesfully", getStoredTodos(), HttpStatus.CREATED);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = ApiResponse.errorResponse("Failed to add todo", error, HttpStatus.FORBIDDEN);
        return res.status(response.status).json(response);
    }
};

// Update todo
export const updateTodo = (req, res) => {
    try {
        const todos = getStoredTodos();
        const id = Number(req.params.id);
        const todo =  todos.find(t => t.id === id);
        if(!todo) {
            const response = ApiResponse.errorResponse("Todo doesn't exists", error, HttpStatus.NOT_FOUND);
            return res.status(response.status).json(response);
        }
        todo.title = req.body.title,
        todo.completed = !todo.completed,
        todo.updatedAt = Date.now()
        saveTodos(todos);
        const response = ApiResponse.successResponse("Todo updated succesfully", todo, HttpStatus.OK);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = ApiResponse.errorResponse("Failed to update todo", error, HttpStatus.FORBIDDEN);
        return res.status(response.status).json(response);
    }
};