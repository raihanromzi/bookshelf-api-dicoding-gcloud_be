import { nanoid } from 'nanoid';
import messages from '../../utils/messages.js';
import ClientError from '../../exceptions/ClientError.js';

class BookService {
  constructor() {
    this.books = [];
    this.addBook = this.addBook.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.getBookById = this.getBookById.bind(this);
    this.deleteBookById = this.deleteBookById.bind(this);
  }

  addBook(payload) {
    if (!payload) {
      throw new ClientError(messages.BOOK.ERROR.FAILED_ADD);
    }

    const {
      name = '',
      year = '',
      author = '',
      summary = '',
      publisher = '',
      pageCount = '',
      readPage = '',
      reading = '',
    } = payload;

    if (readPage > pageCount) {
      throw new ClientError(messages.BOOK.ERROR.READPAGE_GT_PAGECOUNT);
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const finished = pageCount === readPage;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt: insertedAt,
    };

    this.books.push(newBook);

    const isSuccess = this.books.filter((book) => book.id === id).length > 0;

    if (!isSuccess) {
      throw new ClientError(messages.BOOK.ERROR.FAILED_ADD);
    }

    return { bookId: newBook.id };
  }

  getBooks({ name, reading, finished }) {
    if (name) {
      return this.books
        .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
    }

    if (reading) {
      const isReading = reading === '1';
      return this.books
        .filter((book) => book.reading === isReading)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
    }

    if (finished) {
      const isFinished = finished === '1';
      return this.books
        .filter((book) => book.finished === isFinished)
        .map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        }));
    }

    return this.books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  }

  getBookById(bookId) {
    const book = this.books.find((b) => b.id === bookId);

    if (!book) {
      throw new ClientError(
        messages.BOOK.ERROR.BOOK_NOT_FOUND,
        messages.HTTP.ERROR.CODE.NOT_FOUND
      );
    }

    return book;
  }

  editBookById(bookId, payload) {
    if (!payload) {
      throw new ClientError(messages.BOOK.ERROR.FAILED_UPDATE);
    }

    const {
      name = '',
      year = '',
      author = '',
      summary = '',
      publisher = '',
      pageCount = '',
      readPage = '',
      reading = '',
    } = payload;

    if (readPage > pageCount) {
      throw new ClientError(messages.BOOK.ERROR.READPAGE_GT_PAGECOUNT_UPDATE);
    }

    const index = this.books.findIndex((b) => b.id === bookId);

    if (index === -1) {
      throw new ClientError(
        messages.BOOK.ERROR.ID_NOT_FOUND,
        messages.HTTP.ERROR.CODE.NOT_FOUND
      );
    }

    const updatedAt = new Date().toISOString();

    this.books[index] = {
      ...this.books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
  }

  deleteBookById(bookId) {
    const index = this.books.findIndex((b) => b.id === bookId);

    if (index === -1) {
      throw new ClientError(
        messages.BOOK.ERROR.ID_NOT_FOUND_DELETE,
        messages.HTTP.ERROR.CODE.NOT_FOUND
      );
    }

    this.books.splice(index, 1);
  }
}

export default BookService;
