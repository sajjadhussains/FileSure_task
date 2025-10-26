import { Book } from './book.model';

const books = [
  {
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    price: 12.5,
    stock: 100,
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    price: 25.0,
    stock: 50,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    price: 15.75,
    stock: 75,
  },
  {
    title: '1984',
    author: 'George Orwell',
    price: 10.0,
    stock: 120,
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    price: 18.25,
    stock: 80,
  },
];

export const seedBooks = async () => {
  // Clear existing books to avoid duplicates
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log('Database has been seeded with books!');
};
