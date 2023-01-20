function findAuthorById(authors = {}, id = null) {
  return authors.find((authorId) => authorId.id === id);
}

function findBookById(books = {}, id = null) {
  return books.find((bookId) => bookId.id === id);
}

function partitionBooksByBorrowedStatus(books = []) {
  const booksCurrentlyCheckedOut = [];
  const booksReturned = [];

  books.forEach((book) => {
    const returned = book.borrows.every((borrow) => {
      return borrow.returned;
    });
    if (returned === false) {
      return booksCurrentlyCheckedOut.push(book);
    } else {
      return booksReturned.push(book);
    }
  });
  return [booksCurrentlyCheckedOut, booksReturned];
}

function getBorrowersForBook(book = {}, accounts = []) {
  const books = book.borrows.map((bookId) => {
    let account = accounts.find((accountId) => {
      return bookId.id === accountId.id;
    });
    account.returned = bookId.returned;
    return account;
  });
  return books.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
