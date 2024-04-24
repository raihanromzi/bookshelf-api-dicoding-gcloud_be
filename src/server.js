import Hapi from '@hapi/hapi';
import 'dotenv/config';
import logger from './logging/logging.js';
import books from './api/books/index.js';
import BooksService from './services/inMemory/BooksService.js';
import BookValidator from './validator/books/index.js';
import ClientError from './exceptions/ClientError.js';

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

  await server.register({
    plugin: books,
    options: {
      service: new BooksService(),
      validator: BookValidator,
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      return h
        .response({
          status: 'fail',
          message: response.message,
        })
        .code(response.statusCode);
    }

    return h.continue;
  });

  await server.start();

  logger.info(`This API Running on ${server.info.uri}`);
};

init();
