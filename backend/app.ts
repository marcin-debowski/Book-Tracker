import express from "express";
import { initDb } from "./config/db";
import booksRoutes from "./routes/booksRoutes";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
initDb();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/books", booksRoutes);
