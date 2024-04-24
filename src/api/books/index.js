import BookHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'books',
  version: '1.0.0',
  register: (server, { service }) => {
    server.route(routes(new BookHandler(service)));
  },
};
