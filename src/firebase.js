// SDK modular
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjivnml88GAQtZSYppeXYryiL9Wbj8COc",
  authDomain: "todo-en-punta.firebaseapp.com",
  projectId: "todo-en-punta",
  storageBucket: "todo-en-punta.appspot.com",
  messagingSenderId: "729039629511",
  appId: "1:729039629511:web:076a1fb95e196bb69d22e2",
  measurementId: "G-QPWSN69LLJ",
};

// Inicialización
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Accesos a los servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
