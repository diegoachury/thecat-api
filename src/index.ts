import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db";
import userRoutes from "./routes/user.routes";
import catRoutes from "./routes/cat.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/cats", catRoutes);

app.get("/", (req, res) => {
  res.send("API en ejecución...");
});

app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
