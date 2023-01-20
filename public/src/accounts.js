function findAccountById(accounts = {}, id = null) {
  return (accountIdNumber = accounts.find((accountId) => accountId.id === id));
}

function sortAccountsByLastName(accounts = {}) {
  accounts.sort((accountOne, accountTwo) => {
    return accountOne.name.last > accountTwo.name.last ? 1 : -1;
  });
  return accounts;
}

function getTotalNumberOfBorrows(account = {}, books = []) {
  const { id } = account;

  return books.reduce((count, bookId) => {
    let accountIdBookId = bookId.borrows.some((bookObj) => {
      return bookObj.id === id;
    });
    if (accountIdBookId === true) {
      count++;
    }

    return count;
  }, 0);
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  const { id } = account;

  let currentlyCheckedOut = books.filter((bookId) => {
    let bookAccountIsBorrowing = bookId.borrows.some((book) => {
      if (book.returned === false) {
        return book.id === id;
      }
    });
    return bookAccountIsBorrowing;
  });

  let result = currentlyCheckedOut.map((bookId) => {
    let matchingAuthor = authors.find(
      (author) => author.id === bookId.authorId
    );
    bookId.author = matchingAuthor;
    return bookId;
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
