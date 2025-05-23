require("dotenv").config(); // Load environment variables from .env file
const express = require("express"); // Web framework
const morgan = require("morgan"); // HTTP request logger
const cors = require("cors"); // Cross-Origin Resource Sharing
const path = require("path"); // File and directory path utilities
const apiRouter = require("./routers/api");
const pagesRouter = require("./routers/pages");
const config = require("./utils/config");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", apiRouter);
app.use("/", pagesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/`);
});
