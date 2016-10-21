const BASE_URL = "api/auth/signup";

const app = new Vue({
  el: '#signup',
  data: {
    user: {},
    confirmed_password: '',
    error: null
  },
  methods: {
    submit: function() {

      let email = document.getElementById('email').checkValidity();
      let firstName = document.getElementById('first-name').checkValidity();
      let secondName = document.getElementById('second-name').checkValidity();

      let isValid = email && firstName && secondName;

      if(this.user.password !== this.confirmed_password) {
        this.error = {
          body: {
            error: "Passwords don't match each other"
          }
        };

        isValid = false;
      }

      if(isValid) {
        this.$http.post(BASE_URL, this.user)
          .then(res => {
            window.sessionStorage.token = res.body.token;
            window.location.href = "/";
          }, (error) => {
            this.error = error;
            console.log(this.error.body.error);
            console.error(error);
          });
      }
    },
    reset: function() {
      this.user = {};
      this.confirmed_password = '';
    }
  }
});