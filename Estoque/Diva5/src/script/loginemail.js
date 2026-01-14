import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { 
    getAuth, 
    signInWithEmailAndPassword 
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

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "home.html";
      })
      .catch((error) => {
        alert("Email ou senha incorretos");
        console.error(error.code, error.message);
      });
  });