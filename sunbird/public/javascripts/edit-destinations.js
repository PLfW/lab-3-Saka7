const BASE_URL = "api/destinations/";

const headers = {
  "x-access-token": window.sessionStorage.token
};

const app = new Vue({
  el: '#destinations',
  data: {
    destinations: [],
    currentDestination: {}
  },
  methods: {
    getDestinationsData: function() {
      this.$http.get(BASE_URL, {"headers": headers})
        .then(destinations => {
          this.destinations = destinations.body;
        }, (error) => {
          console.error(error);
        });
    },
    submit: function() {
        this.currentDestination.token = window.sessionStorage.token;
        if(!this.currentDestination.id) {
          this.$http.post(BASE_URL, this.currentDestination)
            .then(response => {
              this.getDestinationsData();
            }, (error) => {
              console.error(error);
            });
        } else {
          this.$http.put(BASE_URL + this.currentDestination.id, this.currentDestination)
            .then(response => {
              this.getDestinationsData();
            }, (error) => {
              console.error(error);
            });
        }
      },
    remove: function(destination) {
      this.currentDestination.token = window.sessionStorage.token;
      this.$http.delete(BASE_URL + destination.id, {"headers": headers})
        .then(response => {
          this.getDestinationsData();
        }, (error) => {
          console.error(error);
        });
    },
    edit: function(destination) {
      this.currentDestination = destination;
    },
    reset: function() {
      this.currentDestination = {};
    }
  }
});

app.getDestinationsData();
