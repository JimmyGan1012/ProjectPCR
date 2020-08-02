<template>
  <v-container>
    <v-card max-width="600px" class="mx-auto my-5" flat>
      <div class="d-flex" v-for="(day,index) in currentUser()" :key="index">
        <v-card class="my-2 mx-0" width="100%" v-if="day.length!=0" elevation="13">
          <v-treeview :items="[{name:index,children:day}]">
            <template v-slot:label="{item,leaf}">
              <arrangmentViewInSelf v-if="leaf" :arrangement="item" @updateAllInfo="updateAllInfo"></arrangmentViewInSelf>
              <v-card-title class="text-body-1" v-if="!leaf">第{{index+1}}天你的排刀</v-card-title>
            </template>
          </v-treeview>
        </v-card>
      </div>
    </v-card>
    <v-card max-width="600px" class="mx-auto">
      <v-card-title>新增排刀</v-card-title>
      <v-row>
          <v-col class="py-0 px-0 ml-5">
            <v-text-field
              ref="roundNumber"
              label="周目"
              prepend-icon="mdi-knife-military"
              class="mx-0 my-0"
              type="number"
              :rules="[rule]"
            ></v-text-field>
          </v-col>
          <v-col class="py-0 px-0">
            <v-select
              prepend-icon="mdi-google-downasaur"
              label="X王"
              class="my-0 mx-1"
              :items="[1,2,3,4,5]"
              ref="bossNumber"
            ></v-select>
          </v-col>
          <v-col class="py-0 px-0 mr-5">
            <v-select
              prepend-icon="mdi-calendar-month"
              label="第X天"
              class="my-0 mx-0"
              :items="[1,2,3,4,5,6,7]"
              ref="day"
            ></v-select>
          </v-col>
        </v-row>

        <div v-if="getBossNumber()" class="d-flex justify-center flex-column my-5"> 
          <v-btn v-for="(arrangementSelection,index) in allTimeLines[this.$refs.bossNumber.lazyValue-1]" 
          :key="index"
          @click="selected(arrangementSelection)"
          :color="arrangementSelection.id==selectedArrangement.id? 'red':'white'"
          :class="arrangementSelection.id==selectedArrangement.id? 'white--text mx-auto my-2':'mx-auto my-2'"
          max-width="225">
                    <v-img max-width=35 max-height=35 :src="arrangementSelection.slot1.imgpath"></v-img>
                    <v-img max-width=35 max-height=35 :src="arrangementSelection.slot2.imgpath"></v-img>
                    <v-img max-width=35 max-height=35 :src="arrangementSelection.slot3.imgpath"></v-img>
                    <v-img max-width=35 max-height=35 :src="arrangementSelection.slot4.imgpath"></v-img>
                    <v-img max-width=35 max-height=35 :src="arrangementSelection.slot5.imgpath"></v-img>
                    <span class="my-auto mx-auto">{{arrangementSelection.qualifiedDamage}}W</span>
          </v-btn>
        </div>
        <div id="submit button" class="d-flex flex-row mx-auto pb-10 justify-center">
          <v-btn class="success" @click="submit">Submit</v-btn>
          <v-progress-circular v-if="formInSubmission" indeterminate color="green"></v-progress-circular>
        </div>
        
      <!-- <v-form>
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
      </v-form> -->
    </v-card>
  </v-container>
</template>

<script>
import popbox from "./popbox";
import arrangmentViewInSelf from "./arrangmentViewInSelf";
export default {
  props: ["users", "userLoggedIn","allTimeLines"],
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
      formInSubmission: false,
      pageMounted:false,
      selectedArrangement:{}
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
      if(!(this.$refs.bossNumber.lazyValue && this.$refs.roundNumber.lazyValue && this.$refs.day.lazyValue && this.selectedArrangement.id)){
        alert("Missing Required Info")
        return
      }

      if(this.$refs.bossNumber.lazyValue<=0){
        alert("Wrong Round Number")
        return
      }

      var selectedID=this.selectedArrangement.id
      var day = this.$refs.day.lazyValue;
      var data = {
        username: this.userLoggedIn,
        round: parseInt(this.$refs.roundNumber.lazyValue),
        bossID: this.$refs.bossNumber.lazyValue,
        slot1: this.selectedArrangement.slot1.name,
        slot2: this.selectedArrangement.slot2.name,
        slot3: this.selectedArrangement.slot3.name,
        slot4: this.selectedArrangement.slot4.name,
        slot5: this.selectedArrangement.slot5.name,
        day: this.$refs.day.lazyValue,
        month: this.selectedArrangement.month,
        year: this.selectedArrangement.year,
        timeLineID:this.selectedArrangement.id,
        qualifiedDamage:this.selectedArrangement.qualifiedDamage
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
    selected:function(arrangementSelection){
      if(this.selectedArrangement.id==arrangementSelection.id){
        this.selectedArrangement={}
      }else{
        this.selectedArrangement=arrangementSelection
      }
    },
    updateAllInfo:function(){
      this.$emit("updateAllInfo")
    },
    getBossNumber:function(){
      if(this.pageMounted){
        return(this.$refs.bossNumber.lazyValue)
      }else{
        return null
      }
    }
  },
  mounted: function() {
    this.pageMounted=true
    this.$emit("pageMounted");
  }
};
</script>
