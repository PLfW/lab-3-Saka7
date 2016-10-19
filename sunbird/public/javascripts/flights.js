const BASE_URL = "api/flights/verbose";

const app = new Vue({
  el: '#flights',
  data: {
    flights: []
  },
  methods: {
    getFlightsData: function() {
      this.$http.get(BASE_URL).then(flights => {
        this.flights= flights.body;
      }, (error) => {console.error(error)});
    },
    open: function(id) {
      window.location.href = 'flight?' + id;
    }
  }
});

app.getFlightsData();