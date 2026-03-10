import express from "express";
import dotenv from "dotenv";
dotenv.config();
import todoRoutes from "./routes/todo.routes.js";

const app = express();
app.use(express.json());
app.use("/api/todos/", todoRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
    console.log("Api running");
    res.status(200).send({ msg: "Api running" });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${process.env.DEV_HOST}${PORT}`)
});