  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
  apiKey: "AIzaSyCvHIU1nYdp0YFdEK5Vhx4owQywuslDFlY",
  authDomain: "divas-empreendedoras-erp.firebaseapp.com",
  projectId: "divas-empreendedoras-erp",
  storageBucket: "divas-empreendedoras-erp.firebasestorage.app",
  messagingSenderId: "424568680710",
  appId: "1:424568680710:web:d5c61ddbf9830d9330ae87"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getFirestore(app);
