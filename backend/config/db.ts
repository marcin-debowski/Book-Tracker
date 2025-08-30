import sqlite3 from "sqlite3";

export interface Book {
  id?: number;
  title: string;
  author: string;
  read: boolean;
}

sqlite3.verbose();
const DB_FILE = "./data/books.db";
const getDb = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite:", err.message);
  } else {
    console.log(`Connected to SQLite database: ${DB_FILE}`);
  }
});

export function initDb() {
  getDb.serialize(() => {
    getDb.run(
      `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        read BOOLEAN NOT NULL DEFAULT 0
      )`
    );
  });
}

export default getDb;
