import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, X-Requested-With, Accept, Authorization",
  );
  next();
});

app.use("/api", authRoutes);
app.use("/api", eventsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
