const BASE_URL = "api/flights/verbose";

const headers = {
  "x-access-token": window.sessionStorage.token
};

const app = new Vue({
  el: '#flights',
  data: {
    flights: []
  },
  methods: {
    getFlightsData: function() {
      this.$http.get(BASE_URL, {"headers": headers})
        .then(flights => {
          this.flights= flights.body;
        }, (error) => {
          console.error(error);
        });
    },
    open: function(id) {
      window.location.href = 'flight?' + id;
    },
    filter: function() {
      
    }
  }
});

app.getFlightsData();