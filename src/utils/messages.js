const httpSuccess = {
  CODE: {
    OK: 200,
    CREATED: 201,
  },
  STATUS: {
    OK: 'success',
    CREATED: 'success',
  },
};

const httpErrors = {
  CODE: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
  },
  STATUS: {
    BAD_REQUEST: 'fail',
  },
};

const messages = {
  HTTP: {
    SUCCESS: httpSuccess,
    ERROR: httpErrors,
  },
  BOOK: {
    SUCCESS: {
      ADD: 'Buku berhasil ditambahkan',
      EDIT: 'Buku berhasil diperbarui',
    },
    ERROR: {
      READPAGE_GT_PAGECOUNT:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      INVALID_NAME: 'Gagal menambahkan buku. Mohon isi nama buku',
      FAILED_ADD: 'Buku gagal ditambahkan',
      INVALID_ID: 'Buku tidak ditemukan',
      BOOK_NOT_FOUND: 'Buku tidak ditemukan',
      FAILED_UPDATE: 'Buku gagal diubah',
      INVALID_NAME_UPDATE: 'Gagal memperbarui buku. Mohon isi nama buku',
      READPAGE_GT_PAGECOUNT_UPDATE:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      ID_NOT_FOUND: 'Gagal memperbarui buku. Id tidak ditemukan',
    },
  },
};

export default messages;
