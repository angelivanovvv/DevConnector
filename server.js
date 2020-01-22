const express = require("express");
const mongoDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();

//Load Routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const profileRoute = require("./routes/profile");
const postsRoute = require("./routes/posts");

//Connect mongoDB DataBase
mongoDB();

//Enable all CORS
app.use(cors());

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes - Connect routes to server
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
