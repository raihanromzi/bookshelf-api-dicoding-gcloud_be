const routes = (handler) => [
  {
    method: 'POST',
    path: '/books',
    handler: handler.postBookHandler,
  },
];

export default routes;
