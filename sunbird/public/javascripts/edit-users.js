const BASE_URL = "api/users/";

const app = new Vue({
  el: '#users',
  data: {
    users: [],
    currentUser: {}
  },
  methods: {
    getUsersData: function() {
      this.$http.get(BASE_URL).then(users => {
        this.users = users.body;
      }, (error) => {console.error(error)});
    },
    submit: function() {
        if(!this.currentUser.id) {
          this.$http.post(BASE_URL, this.currentUser).then(response => {
            this.getUsersData();
          },
          error => {console.error(error)});
        } else {
          this.$http.put(BASE_URL + this.currentUser.id,
            this.currentUser).then(response => {
              this.getUsersData();
          },
          error => {console.error(error)});
        }
    },
    remove: function(user) {
      this.$http.delete(BASE_URL + user.id).then(
        response => {
          this.getUsersData();
        },
        error => {console.error(error)});
    },
    edit: function(user) {
      this.currentUser = user;
    },
    reset: function() {
      this.currentUser = {};
    }
  }
});

app.getUsersData();