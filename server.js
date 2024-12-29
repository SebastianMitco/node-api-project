const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cors = require("cors");
//API Security
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect DB
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const categories = require("./routes/categories");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();

app.use(cors());
//Body parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File uploading
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());

//Set securiry headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 100, // 10 min
  max: 100,
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

// Add  npm i cors for using the API from onther host
//
//

//Set static folder
//@desc     let you access files in domain.com/uploads/file_name.jpg
//          becauese public is static folder - domain
app.use(express.static(path.join(__dirname, "public")));

//Mount routers

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/categories", categories);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
