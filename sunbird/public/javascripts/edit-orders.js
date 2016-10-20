const BASE_URL = "api/orders/";

const headers = {
  "x-access-token": window.sessionStorage.token
};

const app = new Vue({
  el: '#orders',
  data: {
    orders: [],
    currentOrder: {}
  },
  methods: {
    getOrdersData: function() {
      this.$http.get(BASE_URL, {"headers": headers})
        .then(orders => {
          this.orders = orders.body;
        }, (error) => {
          console.error(error);
        });
    },
    submit: function() {
        this.currentOrder.token = window.sessionStorage.token;
        if(!this.currentOrder.id) {
          this.$http.post(BASE_URL, this.currentOrder).
            then(response => {
              this.getOrdersData();
            }, (error) => {
              console.error(error);
            });
        } else {
          this.$http.put(BASE_URL + this.currentOrder.id, this.currentOrder)
            .then(response => {
              this.getOrdersData();
            }, (error) => {
              console.error(error);
            });
        }
    },
    remove: function(order) {
      this.$http.delete(BASE_URL + order.id, {"headers": headers})
        .then(response => {
          this.getOrdersData();
        }, (error) => {
          console.error(error);
        });
    },
    edit: function(order) {
      this.currentOrder = order;
    },
    reset: function() {
      this.currentOrder = {};
    }
  }
});

app.getOrdersData();
