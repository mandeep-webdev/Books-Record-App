import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const booksCollectionRef = collection(db, 'Books');

class BookDataService {
  addBooks = (newBook) => {
    return addDoc(booksCollectionRef, newBook);
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
    return getDocs(booksCollectionRef);
  };
  getBook = (id) => {
    const bookDoc = doc(db, 'Books', id);
    return getDoc(bookDoc);
  };
}
export default new BookDataService();
