const BASE_URL = "api/auth/login";

const app = new Vue({
  el: '#login',
  data: {
    user: {},
    error: null 
  },
  methods: {
    submit: function() {
      let isEmailValid = document.getElementById('email').checkValidity();
      let isPasswordValid = document.getElementById('password').checkValidity();
      if(isPasswordValid && isEmailValid) {
        this.$http.post(BASE_URL, this.user)
          .then(res => {
            window.sessionStorage.token = res.body.token;
            window.location.href = "/";
          }, (error) => {
            this.error = error;
            console.error(error);
          });
      }
    },
    reset: function() {
      this.user = {};
    }
  }
});