import { nanoid } from 'nanoid';
import messages from '../../utils/messages.js';
import ClientError from '../../exceptions/ClientError.js';
import logger from '../../logging/logging.js';

class BookService {
  constructor() {
    this.books = [];
    this.addBook = this.addBook.bind(this);
    this.getBooks = this.getBooks.bind(this);
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

    if (name === '') {
      throw new ClientError(messages.BOOK.ERROR.INVALID_NAME);
    }

    if (
      name === '' ||
      year === '' ||
      author === '' ||
      summary === '' ||
      publisher === '' ||
      pageCount === '' ||
      readPage === ''
    ) {
      throw new ClientError(messages.BOOK.ERROR.FAILED_ADD);
    }

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

  getBooks() {
    return this.books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
  }

  // getBookById() {}

  // editBookById() {}

  // deleteBookById() {}
}

export default BookService;
