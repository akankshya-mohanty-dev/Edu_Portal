const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


const mongoose = require("mongoose");
const routes = require("./routers/route");
const cookieParser = require("cookie-parser");


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api", routes);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
