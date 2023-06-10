const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { cors } = require("cors");
const { noteRouter } = require("./routes/note.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("connected to the DB");
        console.log("server is running at port 4500");
    } catch (error) {
        console.log({"error": error.message});
    }
});