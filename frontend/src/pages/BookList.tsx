import { useEffect, useState } from "react";
import axios from "axios";
import Book from "../components/Book";
import type { BookType } from "../types/books.type";
import AddBook from "../components/AddBook";
const BookList = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get<BookType[]>("/api/books/");
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  const handleToggle = async (id: number) => {
    try {
      const res = await axios.post(`/api/books/change-read-status`, { id });
      const updated = res.data as BookType;
      setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (e) {
      console.error("Toggle failed", e);
    }
  };

  return (
    <div className='flex items-center m-4 w-full flex-col'>
      <AddBook onAdded={(book) => setBooks((prev) => [...prev, book])} />
      {books.map((book) => (
        <Book key={book.id} book={book} onToggle={handleToggle} />
      ))}
    </div>
  );
};
export default BookList;
