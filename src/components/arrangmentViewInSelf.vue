<template>
  <div class="d-flex justify-center align-center mx-auto my-1" >
    <!-- <v-dialog v-model="dialogOn" width=600>
      <template v-slot:activator="{on,attrs}" max-width="600px">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon color="blue-grey lighten-1">mdi-circle-edit-outline</v-icon>
        </v-btn>
      </template>
      <v-card width=600 class="mx-auto">
        <v-card-title>Arrangement Information</v-card-title>
        <v-divider></v-divider>
        <v-form>
          <v-container>
          <v-row class="pt-4 d-flex justify-center align-center">
            <v-col>
            <v-text-field
              ref="roundNumber"
              label="Which Round"
              prepend-icon="mdi-knife-military"
              class="mx-2 my-0"
              type="number"
              :rules="[rule]"
              v-model="editedArrangement.round"
            ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                prepend-icon="mdi-google-downasaur"
                label="Boss Number"
                class="my-0 mx-2"
                :items="[1,2,3,4,5]"
                ref="bossNumber"
                v-model="editedArrangement.bossID"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                prepend-icon="mdi-calendar-month"
                label="day X"
                class="my-0 mx-2"
                :items="[1,2,3,4,5,6,7]"
                ref="day"
                v-model="editedArrangement.day"
              ></v-select>
            </v-col>
          </v-row>
          <div
            v-if="arrangement.highestDamage==0 && arrangement.lowestDamage==0"
            max-width="50%"
            class="d-flex flex-row mx-atuo my-0"
          >
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
              v-model="editedArrangement.expectedDamage"
            ></v-text-field>
            <v-spacer></v-spacer>
          </div>

          <div v-if="arrangement.expectedDamage==0" class="d-flex flex-row mx-atuo my-0">
            <v-text-field
              ref="highestDamage"
              label="Highest Damage"
              prepend-icon="mdi-arrow-up-drop-circle"
              class="mx-5 my-auto"
              suffix="W"
              type="number"
              :rules="[rule]"
              v-model="editedArrangement.highestDamage"
            ></v-text-field>
            <v-text-field
              ref="lowestDamage"
              label="Lowest Damage"
              prepend-icon="mdi-arrow-down-drop-circle"
              class="mx-5 my-auto"
              suffix="W"
              type="number"
              :rules="[rule]"
              v-model="editedArrangement.lowestDamage"
            ></v-text-field>
          </div>

          <span class="ml-4 my-3">Character Select:</span>
          <div class="d-flex flex-row mx-auto my-2">
            <v-spacer></v-spacer>
            <img
              class="mx-2"
              height="60"
              width="60"
              :src="editedArrangement.slot1=='' ? '../../static/character_icons/logo.png':editedArrangement.slot1.imgpath"
            />
            <img
              class="mx-2"
              height="60"
              width="60"
              :src="editedArrangement.slot2=='' ? '../../static/character_icons/logo.png':editedArrangement.slot2.imgpath"
            />
            <img
              class="mx-2"
              height="60"
              width="60"
              :src="editedArrangement.slot3=='' ? '../../static/character_icons/logo.png':editedArrangement.slot3.imgpath"
            />
            <img
              class="mx-2"
              height="60"
              width="60"
              :src="editedArrangement.slot4=='' ? '../../static/character_icons/logo.png':editedArrangement.slot4.imgpath"
            />
            <img
              class="mx-2"
              height="60"
              width="60"
              :src="editedArrangement.slot5=='' ? '../../static/character_icons/logo.png':editedArrangement.slot5.imgpath"
            />
            <popbox ref="popbox" @completed="update"></popbox>
            <v-spacer></v-spacer>
          </div>
          <div id="checkbox" class="d-flex flex-row mx-auto my-2">
            <v-spacer v-if="!editedArrangement.played==1"></v-spacer>
            <v-checkbox
              label="Already made"
              v-model="editedArrangement.played"
              class="my-auto mx-5"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <div width="200px" v-if="editedArrangement.played==1">
              <v-text-field
                ref="playedDamage"
                label="Damage Played"
                prepend-icon="mdi-arm-flex"
                class="mx-5 my-auto"
                suffix="W"
                type="number"
                :rules="[rule]"
                v-model="editedArrangement.playedDamage"
              ></v-text-field>
            </div>
          </div>

          <div id="submit button" class="d-flex flex-row mx-auto pb-5">
            <v-spacer></v-spacer>
            <v-btn class="success" @click="submit">Submit</v-btn>
            <v-progress-circular v-if="formInSubmission" indeterminate color="green"></v-progress-circular>
            <v-spacer></v-spacer>
          </div>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog> -->

    <div class="d-flex flex-column justify-center align-center" width="100" height="50">
      <span style="width:100px; text-align:center">Round:{{arrangement.round}}</span>
      <span style="width:100px; text-align:center">Boss:{{arrangement.bossID}}</span>
    </div>
    <v-img
      :src="arrangement.slot1!='' ? arrangement.slot1.imgpath:'../../static/character_icons/logo.png'"
      max-width="50"
      max-height="50"
    ></v-img>
    <v-img
      :src="arrangement.slot2!='' ? arrangement.slot2.imgpath:'../../static/character_icons/logo.png'"
      max-width="50"
      max-height="50"
    ></v-img>
    <v-img
      :src="arrangement.slot3!='' ? arrangement.slot3.imgpath:'../../static/character_icons/logo.png'"
      max-width="50"
      max-height="50"
    ></v-img>
    <v-img
      :src="arrangement.slot4!='' ? arrangement.slot4.imgpath:'../../static/character_icons/logo.png'"
      max-width="50"
      max-height="50"
    ></v-img>
    <v-img
      :src="arrangement.slot5!='' ? arrangement.slot5.imgpath:'../../static/character_icons/logo.png'"
      max-width="50"
      max-height="50"
    ></v-img>
    <span
      class="mx-2"
      v-if="arrangement.expectedDamage==0 && arrangement.played==0"
      style="width:60px; text-align:center"
    >{{(arrangement.highestDamage +arrangement.lowestDamage/2)}}W</span>
    <span
      class="mx-2"
      v-if="arrangement.highestDamage==0 && arrangement.lowestDamage==0 && arrangement.played==0"
      style="width:60px; text-align:center"
    >{{arrangement.expectedDamage}}W</span>
    <span
      class="mx-2"
      v-if="arrangement.played==1"
      :src="arrangement.slot5.imgpath"
      style="width:60px; text-align:center"
    >{{arrangement.playedDamage}}W</span>

    <v-dialog max-width=400 v-model="dialogOn">
      <template v-slot:activator="{on,attrs}" scrollable max-width="600px">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon 
              :color="arrangement.played==1 ? 'green':'red'"
              v-text="arrangement.played==1 ? 'mdi-check':'mdi-close'"
            >
          </v-icon>
        </v-btn>
      </template>
      <v-card class="d-flex flex-column justify-center align-center mx-0" max-width=400 v-if="arrangement.played==0">
        <v-card-title>Entering Played Damage:</v-card-title>
        <v-text-field 
          v-model="editedArrangement.playedDamage"
          label="playedDamage"
          prepend-icon="mdi-knife-military"
          class="mx-auto my-2"
          suffix="W">

        </v-text-field>
        <v-btn class="success mb-4" @click="editArrangement">Confirm</v-btn>
      </v-card>
      <v-card class="d-flex flex-column justify-center align-center mx-0" max-width=400 v-if="arrangement.played==1">
        <v-card-title class="mx-5 my-5">Checked Played Damage:  {{arrangement.playedDamage}}W</v-card-title>
      </v-card>
    </v-dialog>


    <v-btn icon @click="deleteArrangement">
      <v-icon>mdi-delete</v-icon>
    </v-btn>

  </div>
</template>

<script>
import popbox from "./popbox";
export default {
  props: ["arrangement"],
  components: {
    popbox
  },
  data: function() {
    return {
      dialogOn: false,
      editedArrangement: {},
      formInSubmission: false
    };
  },
  methods: {
    update: function(data) {
      this.editedArrangement.slot1 = JSON.parse(
        JSON.stringify(data.selectedCharacters[0])
      );
      this.editedArrangement.slot2 = JSON.parse(
        JSON.stringify(data.selectedCharacters[1])
      );
      this.editedArrangement.slot3 = JSON.parse(
        JSON.stringify(data.selectedCharacters[2])
      );
      this.editedArrangement.slot4 = JSON.parse(
        JSON.stringify(data.selectedCharacters[3])
      );
      this.editedArrangement.slot5 = JSON.parse(
        JSON.stringify(data.selectedCharacters[4])
      );
    },
    rule: function(value) {
      if (value <= 0) {
        return "Must be greater than 0";
      }
      return true;
    },
    //edit the edtiedArrangement
    // edit: function({ name: name, value: value }) {
    //   if (this.editedArrangement[name] != {}) {
    //     this.editedArrangement[name] = value;
    //     console.log("this.editedArrangement[" + name + "]=" + value);
    //   } else {
    //     console.log("edit error, editedArrangement." + name + " DNE");
    //   }
    // },
    editArrangement: function() {

      // if(!this.editedArrangement.played){
      //   this.editedArrangement.playedDamage=0
      // }

      // if(this.editedArrangement.expectedDamage<=0 && this.editedArrangement.highestDamage<=0 && this.editedArrangement.lowestDamage<=0){
      //   alert("Damage can't be less than 0")
      //   return
      // }

      // if(this.editedArrangement.round<=0){
      //   alert("Round Number can't be less than 0")
      //   return
      // }

      // if(this.editedArrangement.played && this.editedArrangement.playedDamage<=0){
      //   alert("Damage can't be less than 0")
      //   return
      // }

      // if(this.editedArrangement.slot1==""|| this.editedArrangement.slot2=="" || this.editedArrangement.slot3=="" || this.editedArrangement.slot4=="" || this.editedArrangement.slot5==""){
      //   alert("Character Not fully selected")
      //   return
      // }
      this.editedArrangement.played=1
      this.$http
            .post("/api/editArrangement",this.editedArrangement)
            .then((res)=>{
              if(res.body.editArrangementSuccess){
                alert("editSuccessed")
              }else{
                alert("Problem Encountered, please try again")   
              }
              this.dialogOn=false
              this.$emit("updateAllInfo")
            },(res)=>{
              alert("Problem Encountered, server rejected, please try again")
              this.dialogOn=false
            })


      console.log("submit:", this.editedArrangement);
      
    },
    deleteArrangement:function(){
      if(confirm("Do you want to delete this arrangement?")){
        this.$http
          .post("/api/deleteArrangement",this.arrangement)
          .then((res)=>{
            if(res.body.deleteArrangementSuccess){
              alert("Succesfully Deleted")
            }else{
              alert("Error Encountered, Please try again")
            }
            this.$emit("updateAllInfo")
          },(res)=>{
            alert("Error Encountered, Please try again")
          })
      }
    }
  },
  created: function() {
    this.editedArrangement = JSON.parse(JSON.stringify(this.arrangement));
  }
};
</script>