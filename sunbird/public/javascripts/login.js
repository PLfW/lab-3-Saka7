const BASE_URL = "api/auth/login";

const app = new Vue({
  el: '#login',
  data: {
    user: {}
  },
  methods: {
    submit: function() {
      this.$http.post(BASE_URL, this.user)
        .then(res => {
          window.sessionStorage.token = res.body.token;
          window.location.href = "/";
        }, (error) => {
          console.error(error);
        });
    },
    reset: function() {
      this.user = {};
    }
  }
});