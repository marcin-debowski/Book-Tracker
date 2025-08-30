import { useState } from "react";
import axios from "axios";
import type { BookType } from "../types/books.type";

interface Props {
  onAdded?: (book: BookType) => void;
}

const AddBook = ({ onAdded }: Props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [read, setRead] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/books/add", { title, author, read });
      const newBook = res.data as BookType;
      onAdded?.(newBook);
      setTitle("");
      setAuthor("");
      setRead(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center justify-center gap-2 w-full max-w-3xl'
    >
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className='p-2 m-2 rounded-md border'
      />
      <input
        type='text'
        placeholder='Author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className='p-2 m-2 rounded-md border'
      />
      <label className='flex items-center mr-2 border p-2 rounded-md'>
        <input
          type='checkbox'
          checked={read}
          onChange={(e) => setRead(e.target.checked)}
          className='mr-2 w-4 h-4 accent-blue-500 focus:ring-blue-500 focus:ring-2'
        />
        Read
      </label>
      <button
        type='submit'
        className='bg-blue-500 text-white rounded-md p-2 w-1/12 min-w-[6rem]'
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBook;
