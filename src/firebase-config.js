import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDtf2BPq-iM_QvxB_nRuytgrt_MZdWGnAk',
  authDomain: 'react-crud-29aaa.firebaseapp.com',
  projectId: 'react-crud-29aaa',
  storageBucket: 'react-crud-29aaa.appspot.com',
  messagingSenderId: '298459214723',
  appId: '1:298459214723:web:b14afe8bb044ebbad13cb6',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
