const BASE_URL = "api/flights/";

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
      this.$http.get(BASE_URL + initialId + "/verbose").then(flight => {
        this.flight = flight.body[0];
      }, (error) => {console.error(error)});
    },
    apply: function() {
      alert(this.payment);
    }
  }
});

app.getFlightData();