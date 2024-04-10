

<template>
 <div>
    <button v-if="!showDialog" @click="openDialog">Buy Stock</button>
    <Stocks v-if="showDialog" @child-event="handleChildEvent">
    </Stocks>
  </div>   
  <div class="about">
      <h1>Logged In</h1>
    </div>
</template>

<script>
import Stocks from '../components/Stocks.vue';

export default {
  components: {
    Stocks
  },
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    handleChildEvent(close) {
      this.showDialog = close;
    }
  }
};
</script>
  
<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  