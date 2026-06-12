const express = require("express");
const cors = require("cors");

const app = express();

const quoteRoutes = require("./routes/quotes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mashego Professional Steel and Woodworks backend is running");
});

app.use("/quotes", quoteRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Mashego backend running on port ${PORT}`);
});
