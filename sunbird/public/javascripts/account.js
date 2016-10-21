const BASE_URL = "api/users/";

const headers = {
  "x-access-token": window.sessionStorage.token
};

const userId = getDataFromToken(window.sessionStorage.token).id;

const app = new Vue({
  el: '#account',
  data: {
    user: {}
  },
  methods: {
    getUserData: function() {
      this.$http.get(BASE_URL + userId, {"headers": headers})
        .then(user => {
          this.user = user.body[0];
          // this.$route.router.go('/');
        }, (error) => {
          console.error(error);
        });
    },
    update: function() {
      this.$http.put(BASE_URL + userId, this.user, {"headers": headers})
        .then(response => {
          this.getUserData();
        }, (error) => {
          console.error(error);
        });
    },
    deleteAccount: function() {
      this.$http.delete(BASE_URL + userId, {"headers": headers})
        .then(response => {
          window.sessionStorage.removeItem('token');
          window.location.href = "/";
        }, (error) => {
          console.error(error);
        });
    }
  }
});

app.getUserData();