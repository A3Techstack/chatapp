<template>
  <div class="page-content page-container" id="page-content">
    <div class="padding">
      <div class="row container d-flex justify-content-center">
        <div class="col-md-6">
          <div class="card card-bordered">
            <div class="card-header">
              <h4 class="card-title"><strong>Chat</strong></h4>
              <!-- <a class="btn btn-xs btn-secondary" href="#" data-abc="true">Let's Chat App</a> -->
            </div>

            <div class="ps-container ps-theme-default ps-active-y" id="chat-content" style="overflow-y: scroll !important; height:400px !important;">
              <div v-for="message in messages" :key="message.id" class="media media-chat" :class="{ 'media-chat-reverse': message.author !== authUser.displayName }">
                <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
                <div class="media-body">
                  <p>{{ message.message }}</p>
                  <p class="meta"><time>{{ message.author }}</time></p>
                </div>
              </div>
            </div>

            <div class="publisher bt-1 border-light">
              <img class="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
              <input v-model="message" @keyup.enter="saveMessage" class="publisher-input" type="text" placeholder="Write something">
              <a class="publisher-btn text-info" @click="saveMessage" data-abc="true"><i class="fa fa-paper-plane"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { onSnapshot, collection, addDoc, getDocs, query, orderBy, } from "firebase/firestore";

export default {
  data() {
    return {
      message: null,
      messages: [],
      authUser: []
    };
  },
  methods: {
    async saveMessage() {
      try {
        const createdAt = new Date();
        const docRef = await addDoc(collection(this.$db, "chat"), {
          message: this.message,
          author: this.authUser.displayName,
          createdAt: createdAt
        });
        console.log("Document written with ID: ", docRef.id);

        // Clear the input field after successful addition
        this.message = null;
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async fetchMessage() {
      try {
        const q = query(collection(this.$db, "chat"), orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);
        const allMessages = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allMessages.push({
            id: doc.id,
            message: data.message,
            author: data.author, // Include the author field
            createdAt: data.createdAt.toDate(),
          });
        });
        return allMessages;
      } catch (error) {
        console.error("Error fetching messages: ", error);
        return [];
      }
    },
    setupRealtimeListener() {
      const q = query(collection(this.$db, "chat"), orderBy("createdAt", "asc"));

        onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const data = change.doc.data();
              this.messages.push({
                id: change.doc.id,
                message: data.message,
                author: data.author, // Include the author field
                createdAt: data.createdAt.toDate(),
              });
            }
          });
        });
      }
    },
    // async logout() {
    //   const auth = getAuth(this.$firebaseApp);
    //   try {
    //     await signOut(auth);
    //     this.authUser = null; // Clear the authUser after sign out
    //     this.vm.$router.push("/login"); // Redirect to the login page or another appropriate page
    //   } catch (error) {
    //     console.error("Error logging out: ", error);
    //   }
    // },
    async created() {
    // Initialize Firebase and get the auth user
    const auth = getAuth(this.$firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });
    this.setupRealtimeListener();
    this.messages = await this.fetchMessage();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const auth = getAuth(vm.$firebaseApp);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is authenticated, continue with the route navigation
          next();
        } else {
          // User is not authenticated, navigate to the login page
          vm.$router.push("/login");
        }
      });
    });
  }
}
</script>

<style scooped="">
.card-bordered {
    border: 1px solid #ebebeb;
}

.card {
    border: 0;
    border-radius: 0px;
    margin-bottom: 30px;
    -webkit-box-shadow: 0 2px 3px rgba(0,0,0,0.03);
    box-shadow: 0 2px 3px rgba(0,0,0,0.03);
    -webkit-transition: .5s;
    transition: .5s;
}

.padding {
    padding: 3rem !important
}

body {
    background-color: #f9f9fa
}

.card-header:first-child {
    border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
}


.card-header {
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    padding: 15px 20px;
    background-color: transparent;
    border-bottom: 1px solid rgba(77,82,89,0.07);
}

.card-header .card-title {
    padding: 0;
    border: none;
}

h4.card-title {
    font-size: 17px;
}

.card-header>*:last-child {
    margin-right: 0;
}

.card-header>* {
    margin-left: 8px;
    margin-right: 8px;
}

.btn-secondary {
    color: #4d5259 !important;
    background-color: #e4e7ea;
    border-color: #e4e7ea;
    color: #fff;
}

.btn-xs {
    font-size: 11px;
    padding: 2px 8px;
    line-height: 18px;
}
.btn-xs:hover{
    color:#fff !important;
}




.card-title {
    font-family: Roboto,sans-serif;
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 0;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(77,82,89,0.07);
}


.ps-container {
    position: relative;
}

.ps-container {
    -ms-touch-action: auto;
    touch-action: auto;
    overflow: hidden!important;
    -ms-overflow-style: none;
}

.media-chat {
    padding-right: 64px;
    margin-bottom: 0;
}

.media {
    padding: 16px 12px;
    -webkit-transition: background-color .2s linear;
    transition: background-color .2s linear;
}

.media .avatar {
    flex-shrink: 0;
}

.avatar {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 100%;
    background-color: #f5f6f7;
    color: #8b95a5;
    text-transform: uppercase;
}

.media-chat .media-body {
    -webkit-box-flex: initial;
    flex: initial;
    display: table;
}

.media-body {
    min-width: 0;
}

.media-chat .media-body p {
    position: relative;
    padding: 6px 8px;
    margin: 4px 0;
    background-color: #f5f6f7;
    border-radius: 3px;
    font-weight: 100;
    color:#9b9b9b;
}

.media>* {
    margin: 0 8px;
}

.media-chat .media-body p.meta {
    background-color: transparent !important;
    padding: 0;
    opacity: .8;
}

.media-meta-day {
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 0;
    color: #8b95a5;
    opacity: .8;
    font-weight: 400;
}

.media {
    padding: 16px 12px;
    -webkit-transition: background-color .2s linear;
    transition: background-color .2s linear;
}

.media-meta-day::before {
    margin-right: 16px;
}

.media-meta-day::before, .media-meta-day::after {
    content: '';
    -webkit-box-flex: 1;
    flex: 1 1;
    border-top: 1px solid #ebebeb;
}

.media-meta-day::after {
    content: '';
    -webkit-box-flex: 1;
    flex: 1 1;
    border-top: 1px solid #ebebeb;
}

.media-meta-day::after {
    margin-left: 16px;
}

.media-chat.media-chat-reverse {
    padding-right: 12px;
    padding-left: 64px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    flex-direction: row-reverse;
}

.media-chat {
    padding-right: 64px;
    margin-bottom: 0;
}

.media {
    padding: 16px 12px;
    -webkit-transition: background-color .2s linear;
    transition: background-color .2s linear;
}

.media-chat.media-chat-reverse .media-body p {
    float: right;
    clear: right;
    background-color: #48b0f7;
    color: #fff;
}

.media-chat .media-body p {
    position: relative;
    padding: 6px 8px;
    margin: 4px 0;
    background-color: #f5f6f7;
    border-radius: 3px;
}


.border-light {
    border-color: #f1f2f3 !important;
}

.bt-1 {
    border-top: 1px solid #ebebeb !important;
}

.publisher {
    position: relative;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 12px 20px;
    background-color: #f9fafb;
}

.publisher>*:first-child {
    margin-left: 0;
}

.publisher>* {
    margin: 0 8px;
}

.publisher-input {
    -webkit-box-flex: 1;
    flex-grow: 1;
    border: none;
    outline: none !important;
    background-color: transparent;
}

button, input, optgroup, select, textarea {
    font-family: Roboto,sans-serif;
    font-weight: 300;
}

.publisher-btn {
    background-color: transparent;
    border: none;
    color: #8b95a5;
    font-size: 16px;
    cursor: pointer;
    overflow: -moz-hidden-unscrollable;
    -webkit-transition: .2s linear;
    transition: .2s linear;
}

.file-group {
    position: relative;
    overflow: hidden;
} 

.publisher-btn {
    background-color: transparent;
    border: none;
    color: #cac7c7;
    font-size: 16px;
    cursor: pointer;
    overflow: -moz-hidden-unscrollable;
    -webkit-transition: .2s linear;
    transition: .2s linear;
} 

.file-group input[type="file"] {
    position: absolute;
    opacity: 0;
    z-index: -1; 
    width: 20px;
}

.text-info {
    color: #48b0f7 !important;
}
</style>