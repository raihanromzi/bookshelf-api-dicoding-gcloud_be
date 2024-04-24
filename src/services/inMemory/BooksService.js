import { nanoid } from 'nanoid';
import messages from '../../utils/messages.js';
import ClientError from '../../exceptions/ClientError.js';

class BookService {
  constructor() {
    this.books = [];
  }

  addBook(payload) {
    if (!payload) {
      throw new Error(messages.BOOK.ERROR.FAILED_ADD);
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

    const bookId = nanoid(16);
    const insertedAt = new Date().toISOString();
    const finished = pageCount === readPage;

    const newBook = {
      bookId,
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

    const isSuccess =
      this.books.filter((book) => book.bookId === bookId).length > 0;

    if (!isSuccess) {
      throw new ClientError(messages.BOOK.ERROR.FAILED_ADD);
    }

    return newBook;
  }

  // getBooks() {}

  // getBookById() {}

  // editBookById() {}

  // deleteBookById() {}
}

export default BookService;
