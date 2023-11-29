
function findAccountById(accounts, id) {
  const found = accounts.find(account => account.id == id )
  return found;
 }
 
function sortAccountsByLastName(accounts) {
  //'sort' mutates the array; do we want to mutate 'accounts' array or do we want to make a copy????
  let sorted = accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
  return sorted;
}
function getTotalNumberOfBorrows(account, books) {
const {
  id: accountId
} = account;
return books.reduce((accumulator, book) => {
return (
      accumulator +
      book.borrows
      .filter(borrow => borrow.id === accountId)
      .reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
  );
}, 0);
}
function getBooksPossessedByAccount(account, books, authors) {
const inPossesion = [];
  books.map((book) => {
    book.borrows.map((borrow) => {
      authors.map((author) => {
        // if iteration 'author' id === 'book' (.map() iteration) authorId, then add "author" key and equate it to iteration 'author'.
        if (author.id === book.authorId) book["author"] = author;
      });
      // if iteration is NOT returned && iteration id === account.id, then push (add) 'book' iteration to 'inPossession' (with "author" key added, from above)
      if (borrow.returned === false && borrow.id === account.id) {
        inPossesion.push(book);
      }
    });
  });
  return inPossesion;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
