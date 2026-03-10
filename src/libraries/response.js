import dotenv from "dotenv";
dotenv.config();
class ApiResponse {
    constructor(msg, data, status = 200) {
        this.msg = msg;
        this.data = data;
        this.status = status;
        this.timestamp = new Date().toISOString();
    }
    static successResponse(message, payLoad) {
        return new ApiResponse(message, payLoad, 200);
    }
    static errorResponse(message, errorObject = null, status = 500) {
        // Determine if we are in development mode
        const isDev = process.env.NODE_ENV === 'DEVELOPMENT';
        // If in dev and an errorObject exists, show the real message. Otherwise, null.
        const details = isDev && errorObject ? errorObject.message : null;
        return new ApiResponse(`Error: ${message}`, details, status);
    }
}
export { ApiResponse };