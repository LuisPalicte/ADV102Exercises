import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCcwyXPJBJdISrUyi2qnA94i8ov1THcKGM",
    authDomain: "luizadv.firebaseapp.com",
    projectId: "luizadv",
    storageBucket: "luizadv.firebasestorage.app",
    messagingSenderId: "376154557535",
    appId: "1:376154557535:web:fa333364dcefc4626f9fea"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 