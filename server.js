require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("Ok");
  })
  .catch((e) => console.error(e));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const routes = require("./routes");
const path = require("path");
// const helmet = require("helmet");
const {
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");
const csrf = require("csurf");

// app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "public")));
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'assets', 'css')));


const sessionOptions = session({
  secret: "ddjs fksd dsgk ldks kasd mvnc lsks",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  receive: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());

// Meus middlewares
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on("Ok", () => {
  app.listen(3000, () => {
    console.log("http://localhost:3000");
  });
});
