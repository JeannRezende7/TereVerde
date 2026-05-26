import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoj7y6IRYdRptcJ9D0sswGLMlV8C5Z3u0",
  authDomain: "tereverde-810b0.firebaseapp.com",
  projectId: "tereverde-810b0",
  storageBucket: "tereverde-810b0.firebasestorage.app",
  messagingSenderId: "129909928238",
  appId: "1:129909928238:web:9fc1ed2e5a239909998abf",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const COLLECTION = "atracoes";

export async function getAtracoes() {
  const q    = query(collection(db, COLLECTION), orderBy("nome"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addAtracao(data) {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    criadoEm: new Date().toISOString(),
  });
  return ref.id;
}

export async function deleteAtracao(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function updateAtracao(id, data) {
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    atualizadoEm: new Date().toISOString(),
  });
}
