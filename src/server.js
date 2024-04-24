import Hapi from '@hapi/hapi';
import 'dotenv/config';
import logger from './logging/logging.js';
import books from './api/books/index.js';
import BooksService from './services/inMemory/BooksService.js';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 9000,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const bookService = new BooksService();

  await server.register({
    plugin: books,
    options: {
      service: bookService,
    },
  });

  await server.start();

  logger.info(`This API Running on ${server.info.uri}`);
};

init();
