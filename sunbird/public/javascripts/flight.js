const BASE_URL = "api/flights/";

const headers = {
  "x-access-token": window.sessionStorage.token
};

const app = new Vue({
  el: '#flight',
  data: {
    flight: {},
    payment: ''
  },
  methods: {
    getFlightData: function() {
      let initialId = window.location.href;
      initialId = +initialId.substring(initialId.lastIndexOf("?") + 1);
      this.$http.get(BASE_URL + initialId + "/verbose", {"headers": headers})
        .then(flight => {
          this.flight = flight.body[0];
        }, (error) => {
          console.error(error);
        });
    },
    apply: function() {
      let order = {
        user_id: getDataFromToken(window.sessionStorage.token).id,
        flight_id: this.flight.id
      };
      this.$http.post("api/orders/", order, {"headers": headers})
        .then(() => {
          window.location.href = "/orders";
        }, (error) => {
          console.error(error);
        });
    }
  }
});

app.getFlightData();