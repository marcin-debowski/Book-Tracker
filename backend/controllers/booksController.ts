import { NextFunction, Request, Response } from "express";
import db from "../config/db";

export const getBooks = (_req: Request, res: Response, next: NextFunction) => {
  db.all(
    "SELECT id, title, author, read FROM books ORDER BY id",
    (err, rows) => {
      if (err) return next(err);
      const books = (rows || []).map((book: any) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        read: !!book.read,
      }));
      res.json(books);
    }
  );
};

export const addBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author, read } = req.body || {};
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  const readVal = read ? 1 : 0;
  db.run(
    `INSERT INTO books (title, author, read) VALUES (?,?,?)`,
    [title, author, readVal],
    function (err) {
      if (err) return next(err);
      db.get(
        `SELECT id, title, author, read FROM books WHERE id = ?`,
        [this.lastID],
        (
          err2,
          row: { id: number; title: string; author: string; read: number }
        ) => {
          if (err2) return next(err2);
          if (!row) return res.status(500).json({ error: "Insert failed" });
          res.status(201).json({
            id: row.id,
            title: row.title,
            author: row.author,
            read: !!row.read,
          });
        }
      );
    }
  );
};

export const changeReadStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body || {};
  if (!id && id !== 0) {
    return res.status(400).json({ error: "id is required" });
  }
  db.get(
    `SELECT id, read FROM books WHERE id = ?`,
    [id],
    (err, row: { id: number; read: number } | undefined) => {
      if (err) return next(err);
      if (!row) return res.status(404).json({ error: "Book not found" });
      const newReadVal = row.read ? 0 : 1;
      db.run(
        `UPDATE books SET read = ? WHERE id = ?`,
        [newReadVal, id],
        function (err2) {
          if (err2) return next(err2);
          db.get(
            `SELECT id, title, author, read FROM books WHERE id = ?`,
            [id],
            (
              err3,
              updated:
                | { id: number; title: string; author: string; read: number }
                | undefined
            ) => {
              if (err3) return next(err3);
              if (!updated)
                return res.status(500).json({ error: "Update failed" });
              res.json({
                id: updated.id,
                title: updated.title,
                author: updated.author,
                read: !!updated.read,
              });
            }
          );
        }
      );
    }
  );
};
