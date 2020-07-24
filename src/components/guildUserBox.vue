<template>
  <v-dialog v-model="dialogOn" min-width="90%">
    <template v-slot:activator="{on,attrs}" scrollable max-width="600px">
      <v-btn v-bind="attrs" v-on="on" min-width="125" text rounded class="mx-3">{{username}}</v-btn>
    </template>
    <v-card max-width="90%" class="mx-auto mt-auto" ref="bottomCard" min-width="100%" min-height="100%">
        <v-card-title>已拥有的角色：</v-card-title>
      <v-container>
        <v-row>
          <v-col v-for="character in have()" :key="character.id" class="px-0 py-0">
            <v-card width="60" height="70" flat :color="character.isEditted ? 'white':'red lighten-4'">
              <div class="d-flex flex-column jusitfy-center align-center" min-height=70>
                <v-img width="50px" height="50px" :src="character.imgpath" :style="character.isTrained ? '':'opacity:0.5'"></v-img>
                <div class="d-flex justify-center align-center" min-height=100>
                  <v-img
                    width="15"
                    height="15"
                    class="mx-0 my-0 d-flex justify-center align-center"
                    v-for="index in new Array(character.defaultStar)"
                    :key="index"
                    :style="character.isTrained ? '':'opacity:0.5'"
                  >
                    <v-icon color="amber accent-2" x-small >mdi-star</v-icon>
                  </v-img>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>
      <v-card-title>未拥有的角色：</v-card-title>
      <v-container>
        <v-row>
          <v-col v-for="character in notHave()" :key="character.id" class="px-0 py-0">
            <v-card width="60" height="70" flat>
              <div class="d-flex flex-column jusitfy-center align-center" min-height=70>
                <v-img width="50px" height="50px" :src="character.imgpath"></v-img>
                <div class="d-flex justify-center align-center" min-height=100>
                  <v-img
                    width="15"
                    height="15"
                    class="mx-0 my-0 d-flex justify-center align-center"
                    v-for="index in new Array(character.defaultStar)"
                    :key="index"
                  >
                    <v-icon color="amber accent-2" x-small>mdi-star</v-icon>
                  </v-img>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["username", "box"],
  
  data: function() {
    return {
      characters: require("./characters"),
      dialogOn:false
    };
  },
  methods: {
    inBox: function(name) {
      var result = false;
      for (var character of this.box) {
        if (character.name == name) {
          result = true;
          break;
        }
      }
      return result;
    },
    have: function() {
      var have = [];
      for (var character of this.characters) {
        for (var cBox of this.box) {
          if (cBox.name == character.name) {
            var editingCharacter = JSON.parse(JSON.stringify(character));
            if (cBox.userStar == 0 || !cBox.isEditted) {
              editingCharacter.userStar = character.defaultStar;
            } else {
              editingCharacter.userStar = cBox.userStar;
            }
            editingCharacter.isTrained = cBox.isTrained;
            editingCharacter.isEditted = cBox.isEditted;
            have.push(editingCharacter);
          }
        }
      }
      return have;
    },
    notHave: function() {
      var notHave = [];
      for (var character of this.characters) {
        if (!this.inBox(character.name)) {
          notHave.push(character);
        }
      }
      return notHave;
    }
  }
};
</script>