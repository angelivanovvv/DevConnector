const express = require("express");
const mongoDB = require("./config/db");
const cors = require("cors");

const app = express();

//Load Routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const profileRoute = require("./routes/profile");
const postsRoute = require("./routes/posts");

//Connect mongoDB DataBase
mongoDB();

//Enable CORS
app.use(cors({ origin: "http://localhost:3000" }));

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Running");
});

//Define Routes - Connect routes to server
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
