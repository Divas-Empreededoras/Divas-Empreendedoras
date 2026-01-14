import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup 
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

  const firebaseConfig = {
  apiKey: "AIzaSyCvHIU1nYdp0YFdEK5Vhx4owQywuslDFlY",
  authDomain: "divas-empreendedoras-erp.firebaseapp.com",
  projectId: "divas-empreendedoras-erp",
  storageBucket: "divas-empreendedoras-erp.firebasestorage.app",
  messagingSenderId: "424568680710",
  appId: "1:424568680710:web:d5c61ddbf9830d9330ae87"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  document.getElementById("googleLogin").addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "home.html";
      })
      .catch((error) => {
        alert("Erro ao autenticar com Google");
        console.error(error.code, error.message);
      });
  });