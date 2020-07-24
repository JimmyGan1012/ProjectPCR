<template>
  <div class="d-flex justify-center">
    <v-card width="100%" height="800" class="my-5 d-flex flex-column overflow-x-auto">
      <div class="d-flex mx-auto justify-center my-2" min-width="100%">
        <v-card class="mx-3 justify-center align-center d-flex" min-width="200" flat>
          <v-card-title>{{info.year}}年{{info.month}}月会战</v-card-title>
        </v-card>
        <v-card class="d-flex justify-end align-center" min-width="150" flat>
          <v-btn icon @click="roundMinus">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          Round: {{roundNum}}
          <v-btn icon @click="roundNum+=1">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card>
        <v-card class="d-flex justify-end align-center" min-width="900" flat></v-card>
        <v-card class="d-flex justify-end align-center" min-width="300" flat>
          <span class="mx-3">日期颜色</span>
          <div class="d-flex align-center">
            <v-card
              class="d-flex justify-center align-center flex-column"
              height="80"
              flat
              v-for="dayNum in [1,2,3,4,5,6,7]"
              :key="dayNum"
            >
              <v-card-title class="px-0 py-0 text--subtitle">{{dayNum}}</v-card-title>
              <v-card
                width="30"
                height="30"
                :color="theme[dayNum-1].color"
                :class="theme[dayNum-1].class"
              ></v-card>
            </v-card>
          </div>
        </v-card>
      </div>

      <div class="d-flex mx-auto justify-center my-2" min-width="100%">
        <v-card
          class="mx-3 justify-center align-center d-flex"
          flat
          min-width="125"
          max-width="125"
        >
          <span class="text-subtitle-1 px-0 align-center">Users\Boss</span>
        </v-card>
        <v-divider vertical></v-divider>
        <v-card
          class="mx-3 justify-center align-center d-flex"
          flat
          min-width="225"
          max-width="225"
        >
          <span class="text-subtitle-1 px-0 align-center">
            Boss 1 HP:{{getBossDam(roundNum,1).min}}~{{getBossDam(roundNum,1).max}}/{{info.bossHP_2}}W
            <br />
          </span>
        </v-card>
        <v-divider vertical></v-divider>
        <v-card
          class="mx-3 justify-center align-center d-flex"
          flat
          min-width="225"
          max-width="225"
        >
          <span class="text-subtitle-1 px-0 align-center">Boss 2 HP:{{getBossDam(roundNum,2).min}}~{{getBossDam(roundNum,2).max}}/{{info.bossHP_2}}W</span>
        </v-card>
        <v-divider vertical></v-divider>

        <v-card
          class="mx-3 justify-center align-center d-flex"
          flat
          min-width="225"
          max-width="225"
        >
          <span class="text-subtitle-1 px-0 align-center">Boss 3 HP:{{getBossDam(roundNum,3).min}}~{{getBossDam(roundNum,3).max}}/{{info.bossHP_3}}W</span>
        </v-card>
        <v-divider vertical></v-divider>

        <v-card
          class="mx-3 justify-center align-center d-flex"
          flat
          min-width="225"
          max-width="225"
        >
          <span class="text-subtitle-1 px-0 align-center">Boss 4 HP:{{getBossDam(roundNum,4).min}}~{{getBossDam(roundNum,4).max}}/{{info.bossHP_4}}W</span>
        </v-card>
        <v-divider vertical></v-divider>

        <v-card
          class="mx-3 justify-center align-center d-flex"
          flat
          min-width="225"
          max-width="225"
        >
          <span class="text-subtitle-1 px-0 align-center">Boss 5 HP:{{getBossDam(roundNum,5).min}}~{{getBossDam(roundNum,5).max}}/{{info.bossHP_5}}W</span>
        </v-card>
      </div>

      <div
        class="d-flex mx-auto justify-center my-2"
        min-width="100%"
        v-for="user in users"
        :key="user.name"
      >
        <guildUserBox :username="user.name" :box="user.box"></guildUserBox>

        <div v-for="bossNum in [1,2,3,4,5]" :key="bossNum">
          <div
            v-if="user.places[`round${roundNum}_boss${bossNum}`]"
            class="d-flex flex-column align-center justify-center mx-3"
          >
            <infoPackButton
              v-for="arr in user.places[`round${roundNum}_boss${bossNum}`]"
              :key="arr.id"
              :arrangement="arr"
            ></infoPackButton>
          </div>

          <div
            v-if="!user.places[`round${roundNum}_boss${bossNum}`]"
            class="d-flex flex-column align-center"
            min-width="225"
            max-width="225"
            min-height="50"
          >
            <v-card
              class="mx-3 justify-center align-center d-flex"
              flat
              min-width="225"
              max-width="225"
              min-height="50"
            ></v-card>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import infoPackButton from "./infoPackButton";
import guildUserBox from "./guildUserBox";
export default {
  props: ["users", "info", "userLoggedIn"],
  data: function() {
    return {
      roundNum: 1,
      theme: [
        {
          color: "red",
          class: "white--text accent-2"
        },
        {
          color: "orange",
          class: "white--text accent-3"
        },
        {
          color: "yellow",
          class: "black--text accent-4"
        },
        {
          color: "lime",
          class: "black--text"
        },
        {
          color: "blue",
          class: "white--text accent-3"
        },
        {
          color: "blue-grey",
          class: "white--text lighten-1"
        },
        {
          color: "purple",
          class: "white--text accent-1"
        }
      ]
    };
  },
  components: {
    infoPackButton,
    guildUserBox
  },
  mounted: function() {
    this.$emit("pageMounted");
  },
  methods: {
    roundMinus: function() {
      if (this.roundNum > 1) {
        this.roundNum -= 1;
      }
    },
    getBossDam: function(roundNum, bossNum) {
      var max = this.info[`bossHP_${bossNum}`];
      var min = this.info[`bossHP_${bossNum}`];
      for (var user of this.users) {
        if (user.places[`round${roundNum}_boss${bossNum}`]) {
          for (var arrangement of user.places[
            `round${roundNum}_boss${bossNum}`
          ]) {
            if (arrangement.played) {
              max-=arrangement.playedDamage
              min-=arrangement.playedDamage
            } else {
              if (arrangement.expectedDamage == 0) {
                max -= arrangement.lowestDamage;
                min -= arrangement.highestDamage;
              } else if (
                arrangement.highestDamage == 0 &&
                arrangement.lowestDamage == 0
              ) {
                max -= arrangement.expectedDamage;
                min -= arrangement.expectedDamage;
              }
            }
          }
        }
      }
      return { max: max, min: min };
    }
  }
};
</script>
