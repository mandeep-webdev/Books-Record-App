import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

const booksCollectionRef = collection(db, 'Books');

class BookDataService {
  addBooks = (newBook) => {
    const modifiedBook = { ...newBook, createdAt: serverTimestamp() };
    return addDoc(booksCollectionRef, modifiedBook);
  };
  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, 'Books', id);
    return updateDoc(bookDoc, updatedBook);
  };
  deleteBook = (id) => {
    const bookDoc = doc(db, 'Books', id);
    return deleteDoc(bookDoc);
  };
  getAllBooks = () => {
    const bookQuery = query(booksCollectionRef, orderBy('createdAt', 'desc'));
    return getDocs(bookQuery);
  };
  getBook = (id) => {
    const bookDoc = doc(db, 'Books', id);
    return getDoc(bookDoc);
  };
}
export default new BookDataService();
