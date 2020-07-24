<template>
  <v-container>
    <h1>here's the SELF page</h1>
    <v-card max-width="600px" class="mx-auto my-5" flat>
      <div class="d-flex" v-for="(day,index) in currentUser()" :key="index">
        <v-card class="my-2 mx-0" width="100%" v-if="day.length!=0" elevation="13">
          <v-treeview :items="[{name:index,children:day}]">
            <template v-slot:label="{item,leaf}">
              <arrangmentViewInSelf v-if="leaf" :arrangement="item" @updateAllInfo="updateAllInfo"></arrangmentViewInSelf>
              <v-card-title class="text-body-1" v-if="!leaf">第{{index+1}}天的排刀</v-card-title>
            </template>
          </v-treeview>
        </v-card>
      </div>
    </v-card>
    <v-card max-width="600px" class="mx-auto">
      <v-card-title>Make new Arrangement</v-card-title>
      <v-form>
        <v-row>
          <v-col class="py-0 px-0 ml-5">
            <v-text-field
              ref="roundNumber"
              label="Which Round"
              prepend-icon="mdi-knife-military"
              class="mx-0 my-0"
              type="number"
              :rules="[rule]"
            ></v-text-field>
          </v-col>
          <v-col class="py-0 px-0">
            <v-select
              prepend-icon="mdi-google-downasaur"
              label="Boss Number"
              class="my-0 mx-1"
              :items="[1,2,3,4,5]"
              ref="bossNumber"
            ></v-select>
          </v-col>
          <v-col class="py-0 px-0 mr-5">
            <v-select
              prepend-icon="mdi-calendar-month"
              label="day X"
              class="my-0 mx-0"
              :items="[1,2,3,4,5,6,7]"
              ref="day"
            ></v-select>
          </v-col>
        </v-row>
        <div v-if="!damSelection" class="d-flex flex-row mx-atuo my-0">
          <v-spacer></v-spacer>
          <v-text-field
            ref="expectedDamage"
            label="Expected Damage"
            prepend-icon="mdi-arm-flex"
            class="mx-5 my-auto"
            width="50%"
            suffix="W"
            type="number"
            :rules="[rule]"
          ></v-text-field>
          <v-spacer></v-spacer>
        </div>
        <div v-if="damSelection" class="d-flex flex-row mx-atuo my-0">
          <v-text-field
            ref="highestDamage"
            label="Highest Damage"
            prepend-icon="mdi-arrow-up-drop-circle"
            class="mx-5 my-auto"
            suffix="W"
            type="number"
            :rules="[rule]"
          ></v-text-field>
          <v-text-field
            ref="lowestDamage"
            label="Lowest Damage"
            prepend-icon="mdi-arrow-down-drop-circle"
            class="mx-5 my-auto"
            suffix="W"
            type="number"
            :rules="[rule]"
          ></v-text-field>
        </div>
        <div class="d-flex flex-row mx-atuo my-0">
          <v-spacer></v-spacer>
          <v-switch v-model="damSelection" label="Highest & Lowest Damage"></v-switch>
          <v-spacer></v-spacer>
        </div>
        <span class="ml-4 my-3">Character Select:</span>
        <div class="d-flex flex-row mx-auto my-2">
          <v-spacer></v-spacer>
          <img
            class="mx-2"
            height="60"
            width="60"
            :src="selectedCharacters[0]=='' ? '../../static/character_icons/logo.png':selectedCharacters[0].imgpath"
          />
          <img
            class="mx-2"
            height="60"
            width="60"
            :src="selectedCharacters[1]=='' ? '../../static/character_icons/logo.png':selectedCharacters[1].imgpath"
          />
          <img
            class="mx-2"
            height="60"
            width="60"
            :src="selectedCharacters[2]=='' ? '../../static/character_icons/logo.png':selectedCharacters[2].imgpath"
          />
          <img
            class="mx-2"
            height="60"
            width="60"
            :src="selectedCharacters[3]=='' ? '../../static/character_icons/logo.png':selectedCharacters[3].imgpath"
          />
          <img
            class="mx-2"
            height="60"
            width="60"
            :src="selectedCharacters[4]=='' ? '../../static/character_icons/logo.png':selectedCharacters[4].imgpath"
          />
          <popbox ref="popbox" @completed="update"></popbox>
          <v-spacer></v-spacer>
        </div>
        <div id="checkbox" class="d-flex flex-row mx-auto my-2">
          <v-spacer v-if="!madeAlready"></v-spacer>
          <v-checkbox label="Already made" v-model="madeAlready" class="my-auto mx-5"></v-checkbox>
          <v-spacer></v-spacer>
          <div width="200px" v-if="madeAlready">
            <v-text-field
              ref="playedDamage"
              label="Damage Played"
              prepend-icon="mdi-arm-flex"
              class="mx-5 my-auto"
              suffix="W"
              type="number"
              :rules="[rule]"
            ></v-text-field>
          </div>
        </div>
        <div id="submit button" class="d-flex flex-row mx-auto pb-10">
          <v-spacer></v-spacer>
          <v-btn class="success" @click="submit">Submit</v-btn>
          <v-progress-circular v-if="formInSubmission" indeterminate color="green"></v-progress-circular>
          <v-spacer></v-spacer>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import popbox from "./popbox";
import arrangmentViewInSelf from "./arrangmentViewInSelf";
export default {
  props: ["users", "userLoggedIn"],
  data: function() {
    return {
      rule: function(value) {
        if (value <= 0) {
          return "Must be greater than 0";
        }
        return true;
      },
      selectedCharacters: ["", "", "", "", ""],
      damSelection: false,
      madeAlready: false,
      formInSubmission: false
    };
  },
  components: {
    popbox,
    arrangmentViewInSelf
  },
  methods: {
    update: function(data) {
      this.selectedCharacters = data.selectedCharacters;
    },
    submit: function() {
      if (
        this.userLoggedIn != "" &&
        this.$refs.roundNumber.lazyValue &&
        this.$refs.day.lazyValue
      ) {
        if (this.$refs.roundNumber.lazyValue <= 0) {
          alert("round number must be larger than 0");
          return;
        }
      } else {
        alert("missing required data");
        return;
      }
      if (this.damSelection) {
        //using hightest & lowest
        if (
          this.$refs.highestDamage.lazyValue &&
          this.$refs.lowestDamage.lazyValue
        ) {
          if (
            this.$refs.highestDamage.lazyValue <= 0 ||
            this.$refs.lowestDamage.lazyValue <= 0
          ) {
            alert("Damage must be larger than 0");
            return;
          }
          if(this.$refs.highestDamage.lazyValue<=this.$refs.lowestDamage.lazyValue){
            alert("Highest Damage must be larger than Lowest Damage");
            return;
          }
        } else {
          alert("missing required data");
          return;
        }
      } else {
        //using expected
        if (this.$refs.expectedDamage.lazyValue) {
          if (this.$refs.expectedDamage.lazyValue <= 0) {
            alert("Damage must be larger than 0");
            return;
          }
        } else {
          alert("missing required data");
          return;
        }
      }

      if (this.madeAlready) {
        if (this.$refs.playedDamage.lazyValue) {
          if (this.$refs.playedDamage.lazyValue <= 0) {
            alert("Damage must be larger than 0");
            return;
          }
        } else {
          alert("missing required data");
          return;
        }
      }

      var roundNumber = parseInt(this.$refs.roundNumber.lazyValue);
      var bossNumber = this.$refs.bossNumber.lazyValue;
      var selectedCharactersName = [];
      var dayNum = this.$refs.day.lazyValue;
      for (var character of this.selectedCharacters) {
        if (character) {
          selectedCharactersName.push(character.name);
        } else {
          selectedCharactersName.push("");
        }
      }
      var data = {
        username: this.userLoggedIn,
        round: roundNumber,
        bossID: bossNumber,
        slot1: selectedCharactersName[0],
        slot2: selectedCharactersName[1],
        slot3: selectedCharactersName[2],
        slot4: selectedCharactersName[3],
        slot5: selectedCharactersName[4],
        day: dayNum,
        month: this.$parent.$parent.currentInfo.month,
        year: this.$parent.$parent.currentInfo.year,
        played: this.madeAlready
      };
      if (this.damSelection) {
        //highest & lowest
        var highestDamage = parseInt(this.$refs.highestDamage.lazyValue);
        var lowestDamage = parseInt(this.$refs.lowestDamage.lazyValue);
        data["highestDamage"] = highestDamage;
        data["lowestDamage"] = lowestDamage;
        data["expectedDamage"] = 0;
      } else {
        //expectedDamage
        var expectedDamage = parseInt(this.$refs.expectedDamage.lazyValue);
        data["expectedDamage"] = expectedDamage;
        data["highestDamage"] = 0;
        data["lowestDamage"] = 0;
      }
      if (this.madeAlready) {
        var playedDamage = parseInt(this.$refs.playedDamage.lazyValue);
        data["playedDamage"] = playedDamage;
      } else {
        data["playedDamage"] = 0;
      }

      if(data.slot1=="" || data.slot2==""|| data.slot3==""|| data.slot4==""|| data.slot5==""){
        alert("角色没有选择全，请确认有5个角色再提交")
        return
      }

      if(this.currentUser()[data.day-1].length>=3){
        alert("第"+data.day+"天的刀数已满三刀，请先删除已有的3刀")
        return
      }

      if (!this.formInSubmission) {
        this.formInSubmission = true;
        this.$http.post("/api/postArrangement", data).then(
          function(res) {
            if (res.body.postSuccessful) {
              alert("Successfully Added!");
            } else {
              alert("Problem encountered. Please try again");
            }
            this.formInSubmission = false;
            this.$emit("updateAllInfo")
          },
          function(res) {
            alert(
              "Unexceped Probelm encountered, response status: " + res.status
            );
            console.log("res.status:", res.status);
            this.formInSubmission = false;
          }
        );
      }

      console.log("posted data:", data);
    },
    currentUser: function() {
      var currentUser = [[], [], [], [], [], [], []];
      for (var user of this.users) {
        if (user.name == this.userLoggedIn) {
          for (var arrangement of user.arrangements) {
            for (var i = 1; i <= 7; i++) {
              if (arrangement.day == i) {
                currentUser[i - 1].push(arrangement);
              }
            }
          }
        }
      }
      console.log("currentUserSet, :", currentUser);
      return currentUser;
    },
    updateAllInfo:function(){
      this.$emit("updateAllInfo")
    }
  },
  mounted: function() {
    this.$emit("pageMounted");
  }
};
</script>
