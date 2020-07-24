<template>
  <v-app>
    <title>PCR</title>
    <heading v-bind:username="username" ref="heading"></heading>
    <router-view
      :users="allUsers"
      :info="currentInfo"
      :userLoggedIn="username"
      @pageMounted="loginCheck"
      @updateAllInfo="getAllInfo"
      @loginSuccesful="login_successful"
      ref="routerComponent"
    ></router-view>
  </v-app>
</template>

<script>
import characters from "./components/characters";
import heading from "./components/heading";
export default {
  created: function() {
    var check = false;
    const Cookies=require("js-cookie")
    if(Cookies.get("username")){
      this.username = Cookies.get("username");
    }
    console.log("created method called");
    this.getAllInfo();
  },
  mounted: function() {
    this.drawerOpen = false;
  },
  data: function() {
    return {
      username: "",
      currentInfo: {
        year: 0,
        month: 0,
        bossHP_1: 0,
        bossHP_2: 0,
        bossHP_3: 0,
        bossHP_4: 0,
        bossHP_5: 0
      },
      allUsers: []
    };
  },
  components: {
    heading
  },
  name: "App",
  methods: {
    login_successful: function(username) {
      this.username = username;
    },
    loginCheck: function() {
      if (this.username == "" || !this.username) {
        this.$refs.heading.login();
      }
    },
    getAllInfo: function() {
      this.$http.get("/api/getAllArrangements", {}, {}).then(
        res => {
          if (res.body.data.getSuccessful) {
            this.currentInfo.month = res.body.data.CurrentInfo.month;
            this.currentInfo.year = res.body.data.CurrentInfo.year;
            this.currentInfo.bossHP_1 = res.body.data.CurrentInfo.bossHP_1;
            this.currentInfo.bossHP_2 = res.body.data.CurrentInfo.bossHP_2;
            this.currentInfo.bossHP_3 = res.body.data.CurrentInfo.bossHP_3;
            this.currentInfo.bossHP_4 = res.body.data.CurrentInfo.bossHP_4;
            this.currentInfo.bossHP_5 = res.body.data.CurrentInfo.bossHP_5;
            this.allUsers = [];
            for (var user of res.body.data.users) {
              this.allUsers.push({
                id: user.id,
                name: user.username,
                arrangements: [],
                places: {},
                box:[]
              });
            }
            for (var arrangement of res.body.data.arrangements) {
              for (var user of this.allUsers) {
                if (user.name == arrangement.username) {
                  var revisedArrangements = arrangement;
                  for (var character of characters) {
                    if (character.name == revisedArrangements.slot1) {
                      revisedArrangements.slot1 = character;
                    }
                    if (character.name == revisedArrangements.slot2) {
                      revisedArrangements.slot2 = character;
                    }
                    if (character.name == revisedArrangements.slot3) {
                      revisedArrangements.slot3 = character;
                    }
                    if (character.name == revisedArrangements.slot4) {
                      revisedArrangements.slot4 = character;
                    }
                    if (character.name == revisedArrangements.slot5) {
                      revisedArrangements.slot5 = character;
                    }
                  }
                  user.arrangements.push(arrangement);
                }
              }
            }

            for (var user of this.allUsers) {
              for (var arrangement of user.arrangements) {
                if (
                  user.places[
                    `round${arrangement.round}_boss${arrangement.bossID}`
                  ]
                ) {
                  user.places[
                    `round${arrangement.round}_boss${arrangement.bossID}`
                  ].push(arrangement);
                } else {
                  user.places[
                    `round${arrangement.round}_boss${arrangement.bossID}`
                  ] = [arrangement];
                }
              }
              for (var box of res.body.data.allBoxes) {
                  if (box.username == user.name) {
                    user.box = JSON.parse(box.box_JSON);
                  }
              }
            }
            if(this.$refs.routerComponent.updateBox){
              this.$refs.routerComponent.updateBox()
            }
            console.log("allUsers:", this.allUsers);

            
          } else {
            console.log("Data get unsucceeded, try again...");
            alert(
              "initilization failed at getting arrangements, please refresh the page"
            );
          }
        },
        res => {
          console.log("Data get unsucceeded, try again...");
          alert(
            "initilization failed at getting arrangements, please refresh the page"
          );
        }
      );
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style scoped>
</style>