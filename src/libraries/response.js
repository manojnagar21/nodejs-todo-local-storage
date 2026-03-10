import { HttpStatus } from "../constants/statusCodes.js"; 
import dotenv from "dotenv";
dotenv.config();
class ApiResponse {
    constructor(msg, data, status = HttpStatus.OK) {
        this.msg = msg;
        this.data = data;
        this.success = status >= 200 && status < 300; // true if 200-299
        this.status = status;
        this.timestamp = new Date().toISOString();
    }
    static successResponse(message, payLoad, status = HttpStatus.OK) {
        return new ApiResponse(message, payLoad, status);
    }
    static errorResponse(message, errorObject = null, status = HttpStatus.INTERNAL_SERVER_ERROR) {
        // Determine if we are in development mode
        const isDev = process.env.NODE_ENV === 'DEVELOPMENT';
        // If in dev and an errorObject exists, show the real message. Otherwise, null.
        const details = isDev && errorObject ? errorObject.message : null;
        return new ApiResponse(`Error: ${message}`, details, status);
    }
}
export { ApiResponse };