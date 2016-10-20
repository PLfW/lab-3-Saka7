const BASE_URL = "api/flights/";

const headers = {
  "x-access-token": window.sessionStorage.token
};

const app = new Vue({
  el: '#flights',
  data: {
    flights: [],
    currentFlight: {}
  },
  methods: {
    getFlightsData: function() {
      this.$http.get(BASE_URL, {"headers": headers})
        .then(flights => {
          this.flights = flights.body;
        }, (error) => {
          console.error(error);
        });
    },
    submit: function() {
        this.currentFlight.token = window.sessionStorage.token;
        if(!this.currentFlight.id) {
          this.$http.post(BASE_URL, this.currentFlight)
            .then(response => {
              this.getFlightsData();
            }, (error) => {
              console.error(error);
            });
        } else {
          this.$http.put(BASE_URL + this.currentFlight.id, this.currentFlight)
            .then(response => {
              this.getFlightsData();
            }, (error) => {
              console.error(error);
            });
        }
    },
    remove: function(flight) {
      this.$http.delete(BASE_URL + flight.id, {"headers": headers})
        .then(response => {
            this.getFlightsData();
        }, (error) => {
          console.error(error);
        });
    },
    edit: function(flight) {
      this.currentFlight = flight;
    },
    reset: function() {
      this.currentFlight = {};
    }
  }
});

app.getFlightsData();