const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo"); // ✅ for storing sessions in MongoDB

require("dotenv").config();

// Routers
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

// DB connection
const db = require("./config/mongoose-connection");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET || "secret", // fallback in case not set
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // ✅ sessions saved in Atlas
      dbName: "scatch", // same DB you use for mongoose
      collectionName: "sessions", // sessions collection
      ttl: 14 * 24 * 60 * 60, // sessions expire after 14 days
    }),
  })
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
