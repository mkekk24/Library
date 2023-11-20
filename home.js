function getTotalBooksCount(books) {
return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0;
  books.forEach(book => {
    if (!book.borrows[0].returned) borrowedBooks++;
  });
  return borrowedBooks;
}

function getMostCommonGenres(books) {
const genresOfBooks = books.map((book) => book.genre);
const fiveCommonGenres = [];
genresOfBooks.map((genre) => {
  const location = fiveCommonGenres.findIndex((element) => element.name === genre);
  if (location >= 0) {
    fiveCommonGenres[location].count = fiveCommonGenres[location].count + 1;
  } else {
    fiveCommonGenres.push({ name: genre, count: 1 });
  }
});
fiveCommonGenres.sort((a, b) => b.count - a.count);
if (fiveCommonGenres.length > 5) {
  return fiveCommonGenres.slice(0, 5);
}
return fiveCommonGenres;
} 

function topFive(array) {
  let popularBooks = array

    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);

  return popularBooks;
}

function getMostPopularBooks(books) {
let popularBooks = [];
  const borrows = books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);

  return topFive(popularBooks);
}


function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];

  for (let author of authors) {
    // loop through authors; create new 'authorName' of first/last names.
    const authorName = `${author.name.first} ${author.name.last}`;
    // loop through books; if 'author' id & 'book' id match, add 'length' (number) of books that have been borrowed to 'count'.
    let count = 0;
    for (let book of books) {
      if (author.id === book.authorId) {
        count += book.borrows.length;
      }
    }
    // create new 'authorObject' object with keys 'name' & 'count'.
    const authorObject = { name: authorName, count: count };
    popularAuthors.push(authorObject);
  }

  return topFive(popularAuthors);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
