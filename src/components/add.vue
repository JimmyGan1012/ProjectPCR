<template>
  <v-card width="500" class="mx-auto my-3">
    <v-card-title>Add new user</v-card-title>
    <div class="d-flex flex-column">
      <v-text-field
        ref="username"
        label="Username"
        prepend-icon="mdi-account-circle"
        class="mx-auto mt-0"
        width="100"
      ></v-text-field>
      <v-text-field
        ref="verificationCode"
        label="Verification Code"
        prepend-icon="mdi-onepassword"
        class="mx-auto mt-0"
        width="100"
      ></v-text-field>
    </div>
    <div class="d-flex justify-center my-3" v-if="verificationCodeIncorrect">
      <span class="text-center text-subtitle-1">
        Verification Code Incorrect
        <br />Please contact adminstrator for the correct code
      </span>
    </div>
    <div class="d-flex justify-center mb-5">
      <v-btn class="success" @click="submit">Submit</v-btn>
      <v-progress-circular v-if="formInSubmission" indeterminate color="green"></v-progress-circular>
    </div>
  </v-card>
</template>

<script>
export default {
  data: function() {
    return {
      verificationCodeIncorrect: false,
      formInSubmission: false
    };
  },
  methods: {
    submit: function() {
      if (!this.formInSubmission) {
        this.formInSubmission = true;
        if (this.$refs.username.lazyValue != "") {
          if (this.$refs.verificationCode.lazyValue != "114514") {
            this.verificationCodeIncorrect = true;
            this.formInSubmission = false;
          } else {
            this.verificationCodeIncorrect = false;
            this.$http
              .post("/api/adduser", {
                newuser: {
                  name: this.$refs.username.lazyValue
                }
              })
              .then(function(res) {
                if (res.body.adduser_successful) {
                  alert("User " + res.body.username + " successfuly added");
                  this.$router.push({
                    name: "login",
                    params: { username: "" }
                  });
                } else {
                  if (res.body.member_fulled) {
                    alert(
                      "Guild Memeber Already Fulled, please contact adminstrator"
                    );
                  } else if (res.body.member_exist) {
                    alert("Account existed, please try another account name");
                  } else {
                    alert("Logic Error Occured, please report this error");
                  }
                }
                this.formInSubmission = false;
              });
          }
        } else {
          alert("username can't be null");
          this.formInSubmission = false;
        }
      }
    }
  }
};
</script>