function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = books.reduce((count, bookObj) => {
    return (count += !bookObj.borrows[0].returned);
  }, 0);
  return result;
}

function getMostCommonGenres(books = []) {
  //have an array to put things in
  let result = [];

  //look at each book
  books.forEach((bookObj) => {
    const { genre } = bookObj;
    //check if the result array contains an with the property name that is equal to the current courseObj's category
    let bookGenre = result.find((genreName) => {
      return genreName.name === genre;
    });
    //if bookGenre is undefined, create a new object and put it into
    if (bookGenre === undefined) {
      let newObj = { name: genre, count: 1 };
      result.push(newObj);
    } else {
      bookGenre.count++;
    }
  });

  let finalResult = helperTopFive(result);
  return finalResult;
}

function getMostPopularBooks(books = []) {
  const result = [];
  books.forEach((book) => {
    const { title, borrows } = book;
    let bookObj = { name: title, count: borrows.length };
    result.push(bookObj);
  });
  let finalResult = helperTopFive(result);
  return finalResult;
}

function getMostPopularAuthors(books = [], authors = []) {
  const result = [];
  books.forEach((book) => {
    const { borrows, authorId } = book;
    const matchingAuthor = authors.find(author => author.id === authorId);
    let bookObj = { name: `${matchingAuthor.name.first} ${matchingAuthor.name.last}`, count: borrows.length };
    result.push(bookObj);
  });
  let finalResult = helperTopFive(result);
  return finalResult;
}

function helperTopFive(arrays) {
  const helper = arrays.sort((elementOne, elementTwo) => {
    return elementTwo.count - elementOne.count;
  });
  return helper.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
