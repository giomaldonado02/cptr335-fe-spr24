<template>
    <div v-if="isOpen" class="dialog-overlay">
      <div class="dialog">
        <table>
            <thead>
                <tr>
                    <th v-for="column in columns">{{column}}</th>
                </tr>
            </thead>
            <tbody v-for="stock in stocks">
              <tr>
                <td @click="buyStock(stock.symbol)">{{ stock.symbol }}</td>
                <td>{{ stock.name }}</td>
                <td>{{ $filters.currency(stock.price, '$', 5) }}</td>
                <td>{{ stock.date }}</td>
              </tr>
              <tr v-if="isEditing && currentSymbol == stock.symbol">
                <td>
                  <button>Buy</button>
                </td>
                <td>
                  <input type="text" v-model="numberOfStocks" maxlength="6" :on-change="calculateCost(stock.price)">
                  X {{ $filters.currency(stock.price, '$', 5)  }} = {{ $filters.currency(cost) }}
                </td>
                <td></td>
                <td @click="cancelBuy()">Cancel</td>
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
        numberOfStocks: 0,
        cost: 0,
        isEditing: false,
        currentSymbol: "",
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
      },
      async buyStock(symbol) {
        this.cost = 0;
        this.numberOfStocks = 0;
        this.currentSymbol = symbol;
        this.isEditing = true;
      },
      cancelBuy() {
        this.currentSymbol = '';
        this.isEditing = false;
        this.cost = 0;
        this.numberOfStocks = 0;
      },
      calculateCost(price) {
        this.cost = this.numberOfStocks * price;
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
  