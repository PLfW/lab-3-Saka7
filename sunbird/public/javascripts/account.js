const BASE_URL = "api/users/";

let userId = 5;

const app = new Vue({
  el: '#account',
  data: {
    user: {}
  },
  methods: {
    getUserData: function() {
      this.$http.get(BASE_URL + userId).then(user => {
        this.user = user.body[0];
      }, (error) => {console.error(error)});
    },
    update: function() {
      this.$http.put(BASE_URL + userId, this.user).then(response => {
        this.getUserData();
      }, error => {console.error(error)});
    },
    deleteAccount: function() {
      this.$http.delete(BASE_URL + userId).then(
        response => {},
        error => {console.error(error)});
    }
  }
});

app.getUserData();