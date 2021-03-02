import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDWi5UQL0ar55F5ecyhcROcVF_3f5T3jHU',
  authDomain: 'quiz-7ca86.firebaseapp.com',
  projectId: 'quiz-7ca86',
  storageBucket: 'quiz-7ca86.appspot.com',
  messagingSenderId: '595007826412',
  appId: '1:595007826412:web:7bb47ddd08383b4e42f8c9',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
