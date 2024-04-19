<!-- <script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script> -->

<script>
import Stocks from '../components/Stocks.vue'

export default {
  components: {
    Stocks
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      balance: '',
      portfolio: '',
      showDialog: false
    }
  },
  methods: {
    openDialog() {
      this.showDialog = true
    },
    handleChildEvent(close) {
      this.showDialog = close
    },
    handleBalanceEvent(balance) {
      this.balance = balance;
    },

    async loadData() {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const response = await fetch(`/be/getUserData`, requestOptions)
        const userData = await response.json()
        this.firstName = userData.firstName
        this.lastName = userData.lastName
        this.email = userData.email
        this.balance = userData.balance
        this.portfolio = userData.portfolio
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    },

    async logOut() {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const response = await fetch('be/logOut', requestOptions)
        if (response.status === 200) {
          this.$router.push('/')
        } else {
          alert('Error logging out!')
        }
      } catch (error) {
        console.log('Error logging out:', error)
      }
    }
  },

  async beforeMount() {
    await this.loadData()
  }
}
</script>

<template>

  <div class="user-info">
    <h1>Welcome {{ firstName }} {{ lastName }}!</h1>
    <p>Email: {{ email }}</p>
    <p>Current Balance: {{ $filters.currency(balance)  }}</p>
  </div>
  

  <div class="container-login100-form-btn">

    <button v-if="!showDialog" @click="openDialog" class="login100-form-btn">Buy Stock</button>
    <Stocks v-if="showDialog" @child-event="handleChildEvent" @balance-event="handleBalanceEvent" :balance="balance"></Stocks>

    <router-link to="/update">
      <button class="login100-form-btn">Update User</button>
    </router-link>

    <router-link to="#">
      <button class="login100-form-btn">Change Password</button>
    </router-link>

    <button class="login100-form-btn" @click="logOut()">Log Out</button>
  </div>

  <div class="portfolio-info">
    <h2>Portfolio</h2>
    <p>{{ portfolio }}</p>
    <p>Luchocoins</p>
  </div>
</template>

<style>
/*//////////////////////////////////////////////////////////////////
[ FONT ]*/

@font-face {
  font-family: Poppins-Regular;
  src: url('../assets/Login/fonts/poppins/Poppins-Regular.ttf');
}

@font-face {
  font-family: Poppins-Bold;
  src: url('../assets/Login/fonts/poppins/Poppins-Bold.ttf');
}

@font-face {
  font-family: Poppins-Medium;
  src: url('../assets/Login/fonts/poppins/Poppins-Medium.ttf');
}

@font-face {
  font-family: Montserrat-Bold;
  src: url('../assets/Login/fonts/montserrat/Montserrat-Bold.ttf');
}

/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  font-family: Poppins-Regular, sans-serif;
}

/*---------------------------------------------*/
a {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
  outline: none !important;
}

a:hover {
  text-decoration: none;
  color: #57b846;
}

/*---------------------------------------------*/
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0px;
}

p {
  font-family: Poppins-Regular;
  font-size: 14px;
  line-height: 1.7;
  color: #666666;
  margin: 0px;
}

ul,
li {
  margin: 0px;
  list-style-type: none;
}

/*//////////////////////////////////////////////////////////////////
[ Utility ]*/

.txt2 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}

@media (max-width: 992px) {
}

/*//////////////////////////////////////////////////////////////////
[ Button ]*/

.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  padding-top: 20px;
}

.login100-form-btn {
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;

  width: 250px;
  height: 50px;
  border-radius: 25px;
  background: #57b846;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background: #333333;
}

/*///////////////////////////////////////////////////////
[User Info]*/

.user-info {
  font-family: Poppins-Regular;
  padding: 25px;
  align-items: center;
}

.portfolio-info {
  font-family: Poppins-Regular;
  padding: 25px;
  align-items: center;
}
</style>
