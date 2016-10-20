const BASE_URL = "api/auth/";

const app = new Vue({
  el: '#login',
  data: {
    user: {}
  },
  methods: {
    submit: function() {
      this.$http.post(BASE_URL, this.user).then(response => {
        window.location.href = "/";
      }, error => {console.error(error)});
    },
    reset: function() {
      this.user = {};
    }
  }
});