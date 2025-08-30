import express from "express";
import {
  addBook,
  changeReadStatus,
  getBooks,
} from "../controllers/booksController";
const router = express.Router();

router.get("/", getBooks);
router.post("/add", addBook);
router.post("/change-read-status", changeReadStatus);
export default router;
