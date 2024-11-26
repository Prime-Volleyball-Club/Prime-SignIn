import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhi_UbbyiWH1GA5r1FIGdi4FTln-HeXMM",
    authDomain: "prime-volleyball-club.firebaseapp.com",
    projectId: "prime-volleyball-club",
    storageBucket: "prime-volleyball-club.firebasestorage.app",
    messagingSenderId: "952933532179",
    appId: "1:952933532179:web:022fa7e040bffa2b3735e6",
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userEmail = document.getElementById('userEmail');
    const signOutBtn = document.getElementById('signOutBtn');

    // ローカルストレージからサインイン状態をチェック
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        userEmail.textContent = user.email;
        loginForm.style.display = 'none';
        welcomeMessage.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        welcomeMessage.style.display = 'none';
    }

    // サインインフォームの送信処理
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Firebaseでメールとパスワードを使ってサインイン
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // ユーザー情報をローカルストレージに保存
                localStorage.setItem('user', JSON.stringify({ email: user.email }));
                location.reload(); // ページをリロードしてサインイン状態を反映
            })
            .catch((error) => {
                alert('サインインエラー: ' + error.message);
            });
    });

    // サインアウトボタンの処理
    signOutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            localStorage.removeItem('user'); // サインアウト後、ローカルストレージからユーザー情報を削除
            location.reload(); // ページをリロードしてサインアウト状態を反映
        });
    });
});
