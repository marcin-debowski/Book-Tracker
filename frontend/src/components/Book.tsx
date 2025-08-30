import type { BookType } from "../types/books.type";

interface Props {
  book: BookType;
  onToggle: (id: number) => void | Promise<void>;
}

const Book = ({ book, onToggle }: Props) => {
  return (
    <div
      key={book.id}
      className='border border-gray-300 rounded-md p-4 m-4 w-1/2 max-w-xl flex flex-col justify-center items-center'
    >
      <h1 className='text-xl font-bold'>
        Title: <span>{book.title}</span>
      </h1>
      <h2 className='text-gray-600'>
        Author: <span>{book.author}</span>
      </h2>
      <button
        onClick={() => onToggle(book.id)}
        className={`${
          book.read
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white rounded-md p-2 w-1/6 min-w-[6rem] transition-colors`}
      >
        {book.read ? "Read" : "To read"}
      </button>
    </div>
  );
};

export default Book;
