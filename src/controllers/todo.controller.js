import { ApiResponse } from "../libraries/response.js";
import { getStoredTodos, saveTodos } from "../helpers/todoHelpers.js";
import { HttpStatus } from "../constants/statusCodes.js";

// Get all todos
export const getTodos = (req, res) => {
    try {
        // To generate fake error
        // throw new Error("Testing my error library!"); 
        let pageNo = req.params.pageNo;
        let perPageItems = 2;
        let startIndex = perPageItems * (pageNo - 1);
        let endIndex = pageNo * perPageItems;
        const totalItems = getStoredTodos().length;
        console.log(getStoredTodos())
        const todoList = [];
        todoList["data"] = getStoredTodos();
        console.log(todoList)
        // pageNo       - 1 2 3 4
        // perPageItems - 2 2 2 2
        // startIndex   - 0 2 4 6
        // endIndex     - 2 4 6 8
        console.log(totalItems);
        const response = ApiResponse.successResponse("All todos", todoList.data.slice(startIndex, endIndex), HttpStatus.OK);
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
        if(!todo) {
            const response = ApiResponse.errorResponse("Todo doesn't exists", null, HttpStatus.NOT_FOUND);
            return res.status(response.status).json(response);
        }
        const response = ApiResponse.successResponse("Todo by id", todo, HttpStatus.OK);
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
            createdAt: new Date().toISOString(),
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
            const response = ApiResponse.errorResponse("Todo doesn't exists", null, HttpStatus.NOT_FOUND);
            return res.status(response.status).json(response);
        }
        todo.title = req.body.title;
        if(req.body.completed !== undefined) {
            todo.completed = req.body.completed
        } else {
            todo.completed = !todo.completed;
        }
        todo.updatedAt = new Date().toISOString()
        saveTodos(todos);
        const response = ApiResponse.successResponse("Todo updated succesfully", todo, HttpStatus.OK);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = ApiResponse.errorResponse("Failed to update todo", error, HttpStatus.FORBIDDEN);
        return res.status(response.status).json(response);
    }
};


// Delete todo
export const deleteTodo = (req, res) => {
    try {
        let todos = getStoredTodos();
        const id = Number(req.params.id);
        const todoToDelete =  todos.find(t => t.id === id);
        if(!todoToDelete) {
            const response = ApiResponse.errorResponse("Todo doesn't exists", null, HttpStatus.NOT_FOUND);
            return res.status(response.status).json(response);
        }
        todos = todos.filter(t => t.id !== id);
        saveTodos(todos);
        const response = ApiResponse.successResponse("Todo deleted succesfully", todoToDelete, HttpStatus.OK);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = ApiResponse.errorResponse("Failed to update todo", error, HttpStatus.FORBIDDEN);
        return res.status(response.status).json(response);
    }
};