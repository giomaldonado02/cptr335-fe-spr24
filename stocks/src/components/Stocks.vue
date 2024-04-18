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
                <td @click="buyStock(stock.symbol)"><u>{{ stock.symbol }}</u></td>
                <td>{{ stock.name }}</td>
                <td>{{ $filters.currency(stock.price, '$', 5) }}</td>
                <td>{{ stock.date }}</td>
              </tr>
              <tr v-if="isEditing && currentSymbol == stock.symbol">
                <td>
                  <button v-if="numberOfStocks == 0" class="small-button-inactive">Buy</button>
                  <button v-if="numberOfStocks > 0" class="small-button" @click="addStock(stock.symbol)">Buy</button>
                </td>
                <td>
                  <input class="inputbox" type="text" v-model="numberOfStocks" maxlength="6" :on-change="calculateCost(stock.price)" size="6">
                  X {{ $filters.currency(stock.price, '$', 5)  }} = {{ $filters.currency(cost) }}
                </td>
                <td></td>
                <td @click="cancelBuy()" class="small-button">Cancel</td>
              </tr>
            </tbody>
        </table>
        <div v-if="error" class="error-style">{{ errorMessage }}</div>
       <button @click="closeDialog" class="button">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['balance'],
    data() {
      return {
        isOpen: false,
        stocks: [],
        columns: ["Symbol", "Name", "Price", "Date"],
        numberOfStocks: 0,
        cost: 0,
        isEditing: false,
        currentSymbol: "",
        error: false,
        errorMessage: '',
      };
    },
    methods: {
      openDialog() {
        this.isOpen = true;
        this.error = false;
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
      async addStock(symbol) {
        this.error = false;
        let price = 0
        const requestOptions = {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
          }
        };
        const response = await fetch(`/be/stock/price/${symbol}`, requestOptions);
        console.log('<<<<< response = ', response);
        const data = await response.json();
        console.log('<<<<< data = ', data);
        if( response.status == 200){
          price = data.price;
        } else {
          this.error = true;
          this.errorMessage = 'Error getting stock price.';
          return;
        }
        this.cost = this.numberOfStocks * price;
        console.log('<<<<< cost = ', this.cost);
        if (this.cost > this.$props.balance) {
          this.error = true;
          this.cost = 0;
          this.errorMessage = 'You do not have enough funds to purchase that main stocks.';
          return;
        }
        this.isEditing = false;
        this.currentSymbol = '';
      },
      async buyStock(symbol) {
        this.error = false;
        this.cost = 0;
        this.numberOfStocks = 0;
        this.currentSymbol = symbol;
        this.isEditing = true;
      },
      cancelBuy() {
        this.error = false;
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

  .inputbox {
    background-color: beige;
    text-align: right;
  }

  .button {
  font-family: Montserrat-Bold;
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;

  width: 100%;
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
  padding: 0 25px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.small-button {
  font-family: Montserrat-Bold;
  font-size: 12px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;

  width: 100%;
  height: 30px;
  border-radius: 15px;
  background: #57b846;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.small-button-inactive {
  font-family: Montserrat-Bold;
  font-size: 12px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;

  width: 100%;
  height: 30px;
  border-radius: 15px;
  background: rgb(211, 235, 184);
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.error-style {
  color: red;
  text-align: center;
}
</style>
  