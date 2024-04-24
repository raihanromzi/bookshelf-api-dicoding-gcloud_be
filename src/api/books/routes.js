const routes = (handler) => [
  {
    method: 'POST',
    path: '/books',
    handler: handler.postBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.getBooksHandler,
  },
];

export default routes;
