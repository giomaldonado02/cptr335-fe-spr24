<template>
    <div v-if="isOpen" class="dialog-overlay">
      <div class="dialog">
        <table>
            <thead>
                <tr>
                    <th v-for="column in columns">{{column}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in stocks">
                    <td>{{ stock.symbol }}</td>
                    <td>{{ stock.name }}</td>
                    <td>{{ $filters.currency(stock.price, '$', 5) }}</td>
                    <td>{{ stock.date }}</td>
                </tr>
            </tbody>
        </table>
       <button @click="closeDialog">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
        stocks: [],
        columns: ["Symbol", "Name", "Price", "Date"],
      };
    },
    methods: {
      openDialog() {
        this.isOpen = true;
      },
      closeDialog() {
        this.isOpen = false;
        this.$emit('child-event', false);
      },
      async getStocks() {
        const requestOptions = {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
          }
        };
        const response = await fetch('/be/stocks', requestOptions);
        const data = await response.json();
        if( response.status === 200){
          this.stocks = data;
        }
      }
    },
    async beforeMount() {
        await this.getStocks();
        this.openDialog();
    },
    unmounted() {
   }
  };
  </script>
  
  <style>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  </style>
  