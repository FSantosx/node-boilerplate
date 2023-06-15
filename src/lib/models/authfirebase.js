require('firebase/auth');
const firebase = require('firebase');

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
};

firebase.initializeApp(firebaseConfig);

async function createAccount(email, senha) {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        console.log('Conta criada com sucesso:', user.uid);
    } catch (error) {
        console.error('Erro ao criar a conta:', error);
    }
}

async function loginWithEmail(email, senha) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        console.log('Login bem-sucedido:', user.uid);
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}

async function createGoogleAccount() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await firebase.auth().signInWithPopup(provider);
        const user = userCredential.user;
        console.log('Conta criada com a conta Google:', user.uid);
    } catch (error) {
        console.error('Erro ao criar a conta com a conta Google:', error);
    }
}

async function loginWithGoogleAccount() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await firebase.auth().signInWithPopup(provider);
        const user = userCredential.user;
        console.log('Login com conta Google bem-sucedido:', user.uid);
    } catch (error) {
        console.error('Erro ao fazer login com conta Google:', error);
    }
}

module.exports = {
    createAccount
    , loginWithEmail
    , createGoogleAccount
    , loginWithGoogleAccount
}