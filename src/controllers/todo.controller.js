import express from "express";
import { ApiResponse } from "../libraries/response.js";
import { getStoredTodos, saveTodos } from "../helpers/todoHelpers.js";

// Get all todos
export const getTodos = (_req, res) => {
    try {
        throw new Error("Testing my error library!"); 
        // return res.status(200).send({ msg: "All todos", data: getStoredTodos });
        const response = ApiResponse.successResponse("All todos", getStoredTodos());
        // console.log(response);
        return res.status(response.status).json(response);
    } catch(error) {
        console.error(error.message);
        const response = ApiResponse.errorResponse("Failed to fetch todos", error);
        return res.status(response.status).json(response);
    }
}