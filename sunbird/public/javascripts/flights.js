const BASE_URL = "api/flights/verbose";

const headers = {
  "x-access-token": window.sessionStorage.token
};

const app = new Vue({
  el: '#flights',
  data: {
    flights: [],
    countries: [],
    cities: [],
    fromCountry: "",
    toCountry: "",
    fromCity: "",
    toCity: "",
    minPrice: 0,
    maxPrice: 0,
    departures: ""
  },
  methods: {
    getFlightsData: function() {
      this.$http.get(BASE_URL, {"headers": headers})
        .then(flights => {
          this.flights= flights.body;

          this.flights.forEach(flight => {

            let from = flight.from.split(" ");
            let to = flight.to.split(" ");

            let fromCountry = from[0];
            let toCountry = to[0];

            from.splice(0, 1);
            to.splice(0, 1);

            let fromCity = from.join('');
            let toCity = to.join('');

            this.countries.push({from: fromCountry, to: toCountry});
            this.cities.push({from: fromCity, to: toCity});

          });

        }, (error) => {
          console.error(error);
        });
    },
    open: function(id) {
      window.location.href = 'flight?' + id;
    },
    filter: function() {
      let options = {
        "headers": headers,
        query: "xxx"
      };

      this.$http.get("api/flights/", options )
        .then(res => {
          console.log(res);
        }, error => {
          console.log(error);
        });
    }

  }
});

app.getFlightsData();