let id = getDataFromToken(window.sessionStorage.token).id;

const BASE_URL = `api/users/${id}/orders/verbose`;

const headers = {
  "x-access-token": window.sessionStorage.token
};

const app = new Vue({
  el: '#orders',
  data: {
    orders: [],
    is_paid: false,
    is_rejected: false
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
    pay: function(order) {
      order.is_paid = true;
      this.$http.put(`/api/orders/${order.id}/pay`, null, {"headers": headers})
        .then(() => {
          this.getOrdersData();
        }, (error) => {
          console.error(error);
        });
    },
    reject: function(order) {
      order.is_rejected = true;
      this.$http.put(`/api/orders/${order.id}/reject`, null, {"headers": headers})
        .then(() => {
          this.getOrdersData();
        }, (error) => {
          console.error(error);
        });
    }
  }
});

app.getOrdersData();