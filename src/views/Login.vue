<template>
    <div class="login-container">
      <div class="login-content">
        <h3>Login With Your Google Account</h3>
        <button @click="login">Login with Google</button>
      </div>
      <div class="cube-background"></div>
    </div>
  </template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default{
    methods: {
        login(){
            const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

            const auth = getAuth();
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...

                this.$router.push('/')

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        }
    }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.login-content {
  text-align: center;
  z-index: 2;
}

button {
  padding: 10px 20px;
  background-color: #4285F4;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.cube-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #4285F4, #0F9D58, #F4B400, #DB4437);
  animation: rotate 20s linear infinite;
  transform-style: preserve-3d;
  opacity: 0.2;
  z-index: 1;
}

@keyframes rotate {
  0% { transform: rotate3d(1, 0, 0, 0deg) rotate3d(0, 1, 0, 0deg); }
  100% { transform: rotate3d(1, 0, 0, 360deg) rotate3d(0, 1, 0, 360deg); }
}
</style>